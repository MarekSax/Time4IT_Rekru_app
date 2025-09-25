'use client';

import Image from 'next/image';
import { useState } from 'react';

import { deleteOrder } from '@/lib/orders';
import { Order, OrdersPage } from '@/lib/orders-types';

import { getColumns } from '../data-table/columns';
import { DataTable } from '../data-table/data-table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';

interface OrdersTableProps {
  initialData: OrdersPage;
}

export default function OrdersTable({ initialData }: OrdersTableProps) {
  const [orders, setOrders] = useState<Order[]>(initialData.items);
  const [total, setTotal] = useState(initialData.total);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;

    const prevOrders = [...orders];
    setOrders(prev => prev.filter(o => o.id !== deleteId));
    setTotal(prev => prev - 1);
    setDialogOpen(false);
    setDeleteId(null);

    try {
      await deleteOrder(deleteId);
    } catch (err) {
      console.error(err);
      setOrders(prevOrders);
      setTotal(prevOrders.length);
    }
  };

  const columns = getColumns(handleDeleteClick);

  return (
    <section className="bg-gray-25 rounded-[12px] border-1 border-gray-200">
      <h1 className="px-5 pt-3 pb-2.5 text-sm font-semibold">Zamówienia</h1>
      <div className="flex flex-col gap-8 rounded-t-[12px] bg-white p-5 outline-1 outline-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl/[38px] font-semibold text-gray-900">{total}</p>
            <p className="text-sm font-normal text-gray-600">wszystkich zamówień</p>
          </div>
          <Button className="bg-brand-600 h-auto px-4 py-2.5 text-base font-semibold">
            <Image src="/images/icons/plus.svg" width={16} height={16} alt="Dodaj zamówienie" unoptimized />
            <span>Dodaj zamówienie</span>
          </Button>
        </div>
      </div>
      <DataTable<Order, any> columns={columns} data={orders} />
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Czy na pewno chcesz usunąć zamówienie?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDialogOpen(false)}>Anuluj</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>Usuń</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
