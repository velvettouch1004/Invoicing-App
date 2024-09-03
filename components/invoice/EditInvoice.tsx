'use client';

import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { InvoiceFormSchema } from '@/app/api/graphql/models/Invoice';
import { useEffect, useState } from 'react';
import { InvoiceData } from '@/lib/types/data';
import { InvoiceForm } from './InvoiceForm';
import { Button } from '../ui/button';

export default function EditInvoice({ invoiceId }: { invoiceId: string }) {
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);

  useEffect(() => {
    fetch(`/api/invoices/${invoiceId}`)
      .then((response) => response.json())
      .then((data) => {
        const newData = data;
        newData.invoiceDate = new Date(data.invoiceDate);
        setInvoiceData(data as InvoiceData);
      })
      .catch((error) => console.error('Error fetching invoice data', error));
  }, [invoiceId]);

  function onSubmit(data: z.infer<typeof InvoiceFormSchema>) {
    fetch('/api/invoices', {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to edit invoice');
        }
        // console.log(response);
        return response.json();
      })
      .then(() => {
        toast('Invoice edited');
      })
      .catch((error) => {
        console.error(error);
        toast('Error editing invoice');
      });
  }

  if (!invoiceData) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Invoice</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[850px]">
        <DialogHeader>
          <h2>Edit Invoice</h2>
          <div className="border border-dustStorm" />
        </DialogHeader>
        <InvoiceForm
          onSubmit={() => onSubmit}
          initialValues={invoiceData}
          isEditing
        />
      </DialogContent>
    </Dialog>
  );
}
