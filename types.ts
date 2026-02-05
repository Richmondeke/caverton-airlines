
export type ShipmentStatus = 'In Transit' | 'Customs Hold' | 'Arrived at Hub' | 'Out for Delivery' | 'Booked' | 'Delivered' | 'Exception' | 'Pending';

export interface Shipment {
  id: string;
  origin: string;
  destination: string;
  status: ShipmentStatus;
  lastUpdate: string;
  dateCreated: string;
  serviceType: string;
  weight: string;
  commodity: string;
  eta?: string;
  pieces?: number;
}

export interface Invoice {
  id: string;
  details: string;
  dateIssued: string;
  amount: number;
  dueDate: string;
  status: 'Outstanding' | 'Overdue' | 'Paid';
}

export interface Quote {
  id: string;
  origin: string;
  destination: string;
  status: 'Valid' | 'Expiring' | 'Expired';
  amount: number;
  expiresIn: string;
  service: string;
}

export interface Claim {
  id: string;
  dateFiled: string;
  shipmentRef: string;
  type: 'Damage' | 'Loss' | 'Delay';
  amount: number;
  status: 'Under Review' | 'Evidence Req' | 'Settled' | 'Rejected';
}
