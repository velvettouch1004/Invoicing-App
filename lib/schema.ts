import * as z from 'zod';
import { Schema } from 'mongoose';

export const InvoiceFormSchema = z.object({
  billed: z
    .number()
    .min(1, { message: 'Billed amount must be a positive number' }),
  businessAddress: z
    .string()
    .min(3, { message: 'Address must be at least 3 characters' }),
  businessCity: z
    .string()
    .min(3, { message: 'City must be at least 3 characters' }),
  businessCountry: z
    .string()
    .min(3, { message: 'Country must be at least 3 characters' }),
  businessEmail: z.string().email(),
  businessName: z
    .string()
    .min(3, { message: 'Business name must be at least 3 characters' }),
  businessZip: z
    .string()
    .min(3, { message: 'Postal Code must be at least 3 characters' }),
  clientAddress: z
    .string()
    .min(3, { message: 'Address must be at least 3 characters' }),
  clientCity: z.string().min(3),
  clientCountry: z
    .string()
    .min(3, { message: 'Country must be at least 3 characters' }),
  clientEmail: z.string().email(),
  clientName: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters' }),
  clientZip: z
    .string()
    .min(3, { message: 'Postal Code must be at least 3 characters' }),
  deliverables: z.array(
    z.object({
      deliverable: z
        .string()
        .min(3, { message: 'Deliverable must be at least 3 characters' }),
      id: z.string(),
      price: z.number(),
      quantity: z.number(),
    }),
  ),
  invoiceDate: z.date({ required_error: 'Invoice date is required' }),
  paymentDue: z.string(),
  paymentTerms: z.string({
    required_error: 'Please select the payment terms.',
  }),
  projectName: z
    .string()
    .min(3, { message: 'Project name must be at least 3 characters' }),

  status: z.string(),
});

export const MongooseInvoiceSchema = new Schema({
  billed: { required: true, type: Number },
  businessAddress: { minlength: 3, required: true, type: String },
  businessCity: { minlength: 3, required: true, type: String },
  businessCountry: { minlength: 3, required: true, type: String },
  businessEmail: {
    // eslint-disable-next-line no-useless-escape
    match: [/.+\@.+\..+/, 'Please enter a valid email address'],
    required: true,
    type: String,
  },
  businessName: { minlength: 3, required: true, type: String },
  businessZip: { minlength: 3, required: true, type: String },
  clientAddress: { minlength: 3, required: true, type: String },
  clientCity: { minlength: 3, required: true, type: String },
  clientCountry: { minlength: 3, required: true, type: String },
  clientEmail: {
    // eslint-disable-next-line no-useless-escape
    match: [/.+\@.+\..+/, 'Please enter a valid email address'],
    required: true,
    type: String,
  },
  clientName: { minlength: 3, required: true, type: String },
  clientZip: { minlength: 3, required: true, type: String },
  deliverables: [
    {
      deliverable: { minlength: 3, required: true, type: String },
      id: { required: true, type: String },
      price: { required: true, type: Number },
      quantity: { min: 1, required: true, type: Number },
    },
  ],
  invoiceDate: { required: true, type: Date },
  paymentDue: { required: true, type: String },
  paymentTerms: { required: true, type: String },
  projectName: { minlength: 3, required: true, type: String },
  status: { required: true, type: String },
});
