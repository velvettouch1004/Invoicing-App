'use client';

import { ColumnDef, CellContext } from '@tanstack/react-table';
import Status from '@/components/Status';
import { InvoiceData, StatusValue } from '@/lib/types/data';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MoreHorizontal } from 'lucide-react';

export const columns: ColumnDef<InvoiceData>[] = [
  {
    accessorKey: 'businessName',
    header: 'Business',
  },
  {
    accessorKey: 'clientName',
    header: 'Client',
  },
  {
    accessorKey: 'paymentDue',
    header: 'Payment Due',
  },
  {
    accessorKey: 'billed',
    header: 'Billed',
  },
  {
    accessorKey: 'status',
    cell: (cell: CellContext<InvoiceData, unknown>) => {
      const status = cell.row.original.status as StatusValue;
      return <Status status={status} />;
    },
    header: 'Status',
  },
  {
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href={`/invoice/${payment._id}`}>View invoice details</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    id: 'actions',
  },
];
