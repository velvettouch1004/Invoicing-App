import { StatusValue } from '@/lib/types/data';
import { ObjectId } from 'mongodb';
import { MongoDataSource } from 'apollo-datasource-mongodb';
import InvoiceModel from '../models/Invoice';

export interface InvoiceDocument {
  _id: ObjectId;
  billed: number;
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
  invoiceDate: Date;
  paymentTerms: string;
  paymentDue: string;
  projectName: string;
  status: StatusValue;
}

export default class Invoices extends MongoDataSource<InvoiceDocument> {
  // eslint-disable-next-line
  async getAllInvoices() {
    try {
      return await InvoiceModel.find();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch invoices: ${error.message}`);
      }
    }
  }

  // eslint-disable-next-line
  async createInvoice({ input }: any) {
    try {
      return await InvoiceModel.create({ ...input });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to create invoice: ${error.message}`);
      }
    }
  }

  // eslint-disable-next-line
  async updateInvoice({ input }: any) {
    try {
      const updatedInvoice = await InvoiceModel.findByIdAndUpdate(
        input.id,
        { ...input },
        {
          new: true,
        },
      );
      return updatedInvoice;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to update invoice: ${error.message}`);
      }
    }
  }

  // eslint-disable-next-line
  async deleteInvoice({ id }: { id: string }): Promise<boolean> {
    try {
      await InvoiceModel.findByIdAndDelete(id);
      return true;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to delete invoice: ${error.message}`);
      }
      return false;
    }
  }
}
