'use client';

import { Delete } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { deleteOrder, fetchOrders } from '@/lib/orders';
import { Order, OrdersPage } from '@/lib/orders-types';

import AddOrderDialog from '../add-order-dialog/add-order-dialog';
import { getColumns } from '../data-table/columns';
import { DataTable } from '../data-table/data-table';
import DeleteOrderDialog from '../delete-order-dialog/delete-order-dialog';
import { Button } from '../ui/button';

interface OrdersTableProps {
  initialData: OrdersPage;
}

export default function OrdersTable({ initialData }: OrdersTableProps) {
  const [orders, setOrders] = useState<Order[]>(initialData.items);
  const [total, setTotal] = useState(initialData.total);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 7 });

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  useEffect(() => {
    if (pagination.pageIndex === 0) return;
    fetchOrders(pagination.pageIndex + 1, pagination.pageSize).then(res => {
      setOrders(res.items);
      setTotal(res.total);
    });
  }, [pagination]);

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmAdd = (data: Order) => {
    setOrders(prev => [...prev, data]);
    setTotal(prev => prev + 1);
    setAddDialogOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;

    const prevOrders = [...orders];
    setOrders(prev => prev.filter(o => o.id !== deleteId));
    setTotal(prev => prev - 1);
    setDeleteDialogOpen(false);
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
          <Button
            className="bg-brand-600 hover:bg-brand-700 h-auto cursor-pointer px-4 py-2.5 text-base font-semibold transition-colors duration-150"
            onClick={() => setAddDialogOpen(true)}
          >
            <Image src="/images/icons/plus.svg" width={16} height={16} alt="Dodaj zamówienie" unoptimized />
            <span>Dodaj zamówienie</span>
          </Button>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={orders}
        total={total}
        pagination={pagination}
        onPaginationChange={setPagination}
      />
      <DeleteOrderDialog
        open={deleteDialogOpen}
        setDialogOpen={setDeleteDialogOpen}
        handleConfirmDelete={handleConfirmDelete}
      />
      <AddOrderDialog open={addDialogOpen} setDialogOpen={setAddDialogOpen} handleConfirmAdd={() => {}} />
    </section>
  );
}
