export type StatusValue =
  | 'paid'
  | 'pending'
  | 'draft'
  | 'overdue'
  | 'cancelled';

export const statusBgClassMap: Record<StatusValue, string> = {
  cancelled: '#dfe3fa',
  draft: '#f4f4f5',
  overdue: '#FFC4C4',
  paid: '#EDFFF1',
  pending: '#FFF9EA',
};

export const statusTextClassMap: Record<StatusValue, string> = {
  cancelled: '#000000',
  draft: '#373b53',
  overdue: '#782C44',
  paid: '#0B2E23',
  pending: '#754C00',
};

export type NetPaymentDataType = '1 Day' | '7 Days' | '14 Days' | '30 Days';

export interface Deliverable {
  id: string;
  deliverable: string;
  quantity: number;
  price: number;
}

export interface Address {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

export interface Item {
  name: string;
  price: number;
  quantity: number;
  total: number;
}

export interface InvoiceData {
  _id: string;
  billed: number;
  businessName: string;
  businessEmail: string;
  businessAddress: string;
  businessCity: string;
  businessZip: string;
  businessCountry: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  clientCity: string;
  clientZip: string;
  clientCountry: string;
  invoiceDate: Date;
  paymentTerms: string;
  paymentDue: string;
  projectName: string;
  status: StatusValue;
  description: string;
  items: Item[];
  total: number;
}
