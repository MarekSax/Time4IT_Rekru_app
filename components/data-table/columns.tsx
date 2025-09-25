'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal, MoreVertical } from 'lucide-react';
import Image from 'next/image';

import { deleteOrder } from '@/lib/orders';
import { Order } from '@/lib/orders-types';

import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export const getColumns = (handleDelete: (id: string) => void): ColumnDef<Order>[] => [
  {
    accessorKey: 'orderNumber',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Numer zamówienia
          <Image src="/images/icons/chevron-selector-vertical.svg" width={12} height={12} alt="Sort" unoptimized />
        </Button>
      );
    },
  },
  {
    accessorKey: 'dueDate',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Data
          <Image src="/images/icons/chevron-selector-vertical.svg" width={12} height={12} alt="Sort" unoptimized />
        </Button>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'totalGross',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Kwota
          <Image src="/images/icons/chevron-selector-vertical.svg" width={12} height={12} alt="Sort" unoptimized />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('totalGross'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);

      return formatted;
    },
  },
  {
    accessorKey: 'customer',
    header: 'Klient',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="data-[state=open]:border-brand-600 h-8 w-8 p-0 data-[state=open]:border-2"
            >
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleDelete(row.original.id)}>Usuń zamówienie</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
