import type { Metadata } from 'next';
import { getInvoices } from '@/lib/functions/fetcher';
import Dashboard from '@/components/Dashboard';

export const metadata: Metadata = {
  description: 'Invoicing app',
  title: 'Invoicing App',
};

export default async function Page() {
  const data = await getInvoices();
  const invoices = data?.invoices;

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col sm:flex-row justify-between items-end border-b border-b-[#768081] pb-2">
        <h1>Invoices</h1>
        <p className="mt-4">
          Total Invoices:
          {' '}
          <span className="font-bold">{invoices.length}</span>
        </p>
      </div>
      <Dashboard invoices={invoices} />
    </div>
  );
}
