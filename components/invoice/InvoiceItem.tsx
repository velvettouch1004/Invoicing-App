import { formatCurrency } from '@/lib/functions/formatCurrency';
import { InvoiceData } from '@/lib/types/data';
import { format } from 'date-fns';
import Status from '../Status';

export default function InvoiceItem({
  invoiceDate,
  paymentDue,
  clientName,
  businessName,
  total,
  status,
  shouldDisplayInvoice,
}: InvoiceData & { shouldDisplayInvoice?: (item: string) => boolean }) {
  if (!shouldDisplayInvoice || shouldDisplayInvoice(status)) {
    return (
      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] items-center justify-between">
        <p className="whitespace-nowrap text-ellipsis">
          {format(invoiceDate, 'PPP')}
        </p>
        <p>{paymentDue}</p>
        <p>{businessName}</p>
        <p>{clientName}</p>
        <p className="font-bold text-[0.9375rem]">{formatCurrency(total)}</p>
        <Status status={status} />
      </div>
    );
  }
}
