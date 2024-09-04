import { MongooseInvoiceSchema } from '@/lib/schema';
import mongoose from 'mongoose';

export default mongoose.models.InvoiceModel || mongoose.model('InvoiceModel', MongooseInvoiceSchema);
