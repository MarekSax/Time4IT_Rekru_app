'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Check, MoreVertical } from 'lucide-react';

import { Order } from '@/lib/orders-types';

import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import OrderStatusBadge from './badge';
import HeaderButton from './header-button';

export const getColumns = (handleDelete: (id: string) => void): ColumnDef<Order>[] => [
  {
    id: 'checkbox',
    header: () => (
      <div className="w-fit pl-5">
        <Checkbox className="size-5" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-fit pl-5">
        <Checkbox id={`checkbox-${row.original.id}`} className="size-5" />
      </div>
    ),
  },
  {
    accessorKey: 'orderNumber',
    header: ({ column }) => {
      return <HeaderButton column={column}>Numer zamówienia</HeaderButton>;
    },
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('orderNumber')}</div>;
    },
  },
  {
    accessorKey: 'dueDate',
    header: ({ column }) => {
      return <HeaderButton column={column}>Data</HeaderButton>;
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue('dueDate'));
      const formatted = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });

      return formatted;
    },
  },
  {
    accessorKey: 'status',
    header: () => <div className="text-xs font-semibold text-gray-500">Status</div>,
    cell: ({ row }) => {
      return <OrderStatusBadge status={row.getValue('status')} />;
    },
  },
  {
    accessorKey: 'totalGross',
    header: ({ column }) => {
      return <HeaderButton column={column}>Kwota</HeaderButton>;
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
    header: () => <span className="text-xs font-semibold text-gray-500">Klient</span>,
    cell: ({ row }) => <span className="font-medium">{row.getValue('customer')}</span>,
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
