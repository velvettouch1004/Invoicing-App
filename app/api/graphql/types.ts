import { Double } from 'mongodb';

export interface Invoice {
  id: string;
  billed: Double;
  businessAddress: string;
  businessCity: string;
  businessCountry: string;
  businessEmail: string;
  businessName: string;
  businessZip: string;
  clientAddress: string;
  clientCity: string;
  clientCountry: string;
  clientEmail: string;
  clientName: string;
  clientZip: string;
  invoiceDate: string;
  paymentDue: string;
  paymentTerms: string;
  projectName: string;
  status: string;
}
