'use client';

import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { InvoiceFormSchema } from '@/lib/schemas';
import { Button } from '../ui/button';
import { InvoiceForm } from './InvoiceForm';

export default function AddInvoice() {
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
          throw new Error('Failed to submit invoice');
        }
        return response.json();
      })
      .then(() => {
        // console.log(data);
        toast('Invoice saved');
      })
      .catch((error) => {
        console.error(error);
        toast('Error saving invoice');
        // console.log(data);
      });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Invoice</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[850px]">
        <DialogHeader>
          <h2>Add Invoice</h2>
          <div className="border border-dustStorm" />
        </DialogHeader>
        <InvoiceForm
          onSubmit={() => onSubmit}
          isEditing={false}
        />
      </DialogContent>
    </Dialog>
  );
}
