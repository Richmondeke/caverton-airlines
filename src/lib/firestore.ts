import {
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    query,
    where,
    orderBy,
    Timestamp,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

// Types
export interface ShipmentAddress {
    name: string;
    company?: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
    email?: string;
}

export interface ShipmentPackage {
    weight: number;
    dimensions: {
        length: number;
        width: number;
        height: number;
    };
    description: string;
    declaredValue?: number;
    isFragile: boolean;
    requiresSignature: boolean;
}

export interface ShipmentPrice {
    base: number;
    fuel: number;
    insurance?: number;
    total: number;
    currency: string;
}

export type ShipmentStatus =
    | "pending"
    | "confirmed"
    | "picked_up"
    | "in_transit"
    | "at_hub"
    | "out_for_delivery"
    | "delivered"
    | "cancelled"
    | "returned";

export interface Shipment {
    id?: string;
    trackingNumber: string;
    userId: string;
    status: ShipmentStatus;
    currentLocation: string;
    progress: number;
    package: ShipmentPackage;
    sender: ShipmentAddress;
    recipient: ShipmentAddress;
    service: "express" | "standard" | "economy";
    estimatedDelivery: Timestamp;
    price: ShipmentPrice;
    paymentStatus: "pending" | "paid" | "failed" | "refunded";
    paymentMethod?: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    pickedUpAt?: Timestamp;
    deliveredAt?: Timestamp;
}

export interface TrackingEvent {
    id?: string;
    shipmentId: string;
    status: ShipmentStatus;
    location: string;
    description: string;
    timestamp: Timestamp;
    createdBy?: string;
}

// Generate tracking number
export function generateTrackingNumber(): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "CF-";
    for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Create a new shipment
export async function createShipment(
    shipmentData: Omit<Shipment, "id" | "trackingNumber" | "createdAt" | "updatedAt" | "status" | "progress" | "currentLocation">
): Promise<string> {
    const trackingNumber = generateTrackingNumber();

    const shipment: Omit<Shipment, "id"> = {
        ...shipmentData,
        trackingNumber,
        status: "pending",
        currentLocation: shipmentData.sender.city + ", " + shipmentData.sender.country,
        progress: 0,
        createdAt: serverTimestamp() as Timestamp,
        updatedAt: serverTimestamp() as Timestamp,
    };

    const docRef = await addDoc(collection(db, "shipments"), shipment);

    // Create initial tracking event
    await addTrackingEvent(docRef.id, {
        shipmentId: docRef.id,
        status: "pending",
        location: shipment.currentLocation,
        description: "Shipment created and awaiting pickup",
        timestamp: serverTimestamp() as Timestamp,
    });

    return trackingNumber;
}

// Get shipment by tracking number
export async function getShipmentByTracking(trackingNumber: string): Promise<Shipment | null> {
    const q = query(
        collection(db, "shipments"),
        where("trackingNumber", "==", trackingNumber.toUpperCase())
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
        return null;
    }

    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as Shipment;
}

// Get user's shipments
export async function getUserShipments(userId: string): Promise<Shipment[]> {
    const q = query(
        collection(db, "shipments"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Shipment);
}

// Add tracking event
export async function addTrackingEvent(
    shipmentId: string,
    event: Omit<TrackingEvent, "id">
): Promise<void> {
    await addDoc(collection(db, "shipments", shipmentId, "tracking_events"), event);
}

// Get tracking events for a shipment
export async function getTrackingEvents(shipmentId: string): Promise<TrackingEvent[]> {
    const q = query(
        collection(db, "shipments", shipmentId, "tracking_events"),
        orderBy("timestamp", "desc")
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as TrackingEvent);
}

// Update shipment status
export async function updateShipmentStatus(
    shipmentId: string,
    status: ShipmentStatus,
    location: string,
    description: string,
    updatedBy?: string
): Promise<void> {
    const shipmentRef = doc(db, "shipments", shipmentId);

    // Calculate progress based on status
    const progressMap: Record<ShipmentStatus, number> = {
        pending: 0,
        confirmed: 15,
        picked_up: 30,
        in_transit: 50,
        at_hub: 65,
        out_for_delivery: 85,
        delivered: 100,
        cancelled: 0,
        returned: 0,
    };

    await updateDoc(shipmentRef, {
        status,
        currentLocation: location,
        progress: progressMap[status],
        updatedAt: serverTimestamp(),
        ...(status === "delivered" && { deliveredAt: serverTimestamp() }),
        ...(status === "picked_up" && { pickedUpAt: serverTimestamp() }),
    });

    // Add tracking event
    await addTrackingEvent(shipmentId, {
        shipmentId,
        status,
        location,
        description,
        timestamp: serverTimestamp() as Timestamp,
        createdBy: updatedBy,
    });
}

// Format timestamp for display
export function formatTimestamp(timestamp: Timestamp): string {
    if (!timestamp || !timestamp.toDate) return "";
    return timestamp.toDate().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
}

// Get status display text
export function getStatusDisplay(status: ShipmentStatus): string {
    const displayMap: Record<ShipmentStatus, string> = {
        pending: "Pending",
        confirmed: "Confirmed",
        picked_up: "Picked Up",
        in_transit: "In Transit",
        at_hub: "At Sorting Hub",
        out_for_delivery: "Out for Delivery",
        delivered: "Delivered",
        cancelled: "Cancelled",
        returned: "Returned",
    };
    return displayMap[status];
}
