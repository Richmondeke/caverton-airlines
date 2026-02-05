
import { Shipment, Invoice, Quote, Claim } from './types';

export const SHIPMENTS: Shipment[] = [
  {
    id: '#SHP-2023-001',
    origin: 'Shanghai (PVG)',
    destination: 'Los Angeles (LAX)',
    status: 'In Transit',
    lastUpdate: 'Oct 24, 10:00 AM',
    dateCreated: 'Oct 22, 2023',
    serviceType: 'Ocean Freight',
    weight: '1,200 kg',
    commodity: 'Electronics',
    eta: 'Oct 28, 2023',
    pieces: 12
  },
  {
    id: '#SHP-2023-002',
    origin: 'Berlin (BER)',
    destination: 'New York (JFK)',
    status: 'Customs Hold',
    lastUpdate: 'Oct 23, 04:30 PM',
    dateCreated: 'Oct 20, 2023',
    serviceType: 'Air Express',
    weight: '450 kg',
    commodity: 'Auto Parts',
    eta: 'Oct 26, 2023'
  },
  {
    id: '#SHP-2023-003',
    origin: 'Tokyo (NRT)',
    destination: 'Singapore (SIN)',
    status: 'Arrived at Hub',
    lastUpdate: 'Oct 24, 08:15 AM',
    dateCreated: 'Oct 21, 2023',
    serviceType: 'Air Standard',
    weight: '800 kg',
    commodity: 'Perishables'
  },
  {
    id: '#SHP-2023-004',
    origin: 'London (LHR)',
    destination: 'Dubai (DXB)',
    status: 'Out for Delivery',
    lastUpdate: 'Oct 24, 11:45 AM',
    dateCreated: 'Oct 22, 2023',
    serviceType: 'Ground Express',
    weight: '300 kg',
    commodity: 'Textiles'
  },
  {
    id: '#SHP-2023-005',
    origin: 'Sydney (SYD)',
    destination: 'San Francisco (SFO)',
    status: 'Booked',
    lastUpdate: 'Oct 22, 09:00 AM',
    dateCreated: 'Oct 21, 2023',
    serviceType: 'Ocean Freight',
    weight: '2,500 kg',
    commodity: 'Furniture'
  }
];

export const INVOICES: Invoice[] = [
  { id: 'INV-2023-001', details: 'Air Freight - Batch A2', dateIssued: 'Oct 24, 2023', amount: 3450.00, dueDate: 'Oct 31, 2023', status: 'Outstanding' },
  { id: 'INV-2023-004', details: 'Customs Clearance', dateIssued: 'Sep 28, 2023', amount: 2100.00, dueDate: 'Oct 05, 2023', status: 'Overdue' },
  { id: 'INV-2023-002', details: 'Sea Freight - Container X', dateIssued: 'Oct 15, 2023', amount: 1200.00, dueDate: 'Oct 15, 2023', status: 'Paid' },
  { id: 'INV-2023-003', details: 'Ground Transport', dateIssued: 'Oct 01, 2023', amount: 850.00, dueDate: 'Oct 08, 2023', status: 'Paid' }
];

export const QUOTES: Quote[] = [
  { id: 'Q-8823', origin: 'PVG', destination: 'LAX', status: 'Valid', amount: 3450.00, expiresIn: '2 days', service: 'Air Freight' },
  { id: 'Q-8901', origin: 'HAM', destination: 'NYC', status: 'Valid', amount: 1850.00, expiresIn: '5 days', service: 'Ocean Freight' },
  { id: 'Q-7112', origin: 'BER', destination: 'PAR', status: 'Expiring', amount: 650.00, expiresIn: '4 hours', service: 'Road Freight' }
];

export const CLAIMS: Claim[] = [
  { id: 'CLM-2023-001', dateFiled: 'Oct 24, 2023', shipmentRef: 'SHP-99283', type: 'Damage', amount: 5200, status: 'Under Review' },
  { id: 'CLM-2023-004', dateFiled: 'Oct 22, 2023', shipmentRef: 'SHP-11029', type: 'Loss', amount: 12500, status: 'Evidence Req' },
  { id: 'CLM-2023-008', dateFiled: 'Oct 20, 2023', shipmentRef: 'SHP-33412', type: 'Delay', amount: 800, status: 'Settled' }
];
