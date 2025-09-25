import React from 'react';

import { cn } from '@/lib/utils';

import { Badge } from '../ui/badge';

interface OrderStatusBadgeProps {
  status: 'new' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}
const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  const statuses = {
    new: 'Nowe',
    processing: 'Przygotowanie',
    shipped: 'Wysłane',
    delivered: 'Dostarczone',
    cancelled: 'Anulowane',
  };

  const dotColors = {
    new: 'bg-brand-500',
    processing: 'bg-brand-500',
    shipped: 'bg-success-500',
    delivered: 'bg-success-500',
    cancelled: 'bg-error-500',
  };

  const classes = {
    new: 'bg-brand-50 border-brand-200 text-brand-600',
    processing: 'bg-brand-50 border-brand-200 text-brand-600',
    shipped: 'bg-success-50 border-success-200 text-success-700',
    delivered: 'bg-success-50 border-success-200 text-success-700',
    cancelled: 'bg-error-50 border-error-200 text-error-700',
  };

  if (statuses[status]) {
    return (
      <Badge className={cn('rounded-2xl border-1 py-[2px] pr-2 pl-1.5 text-xs/[18px] font-medium', classes[status])}>
        <div className={cn('size-1.5 rounded-full', dotColors[status])} />
        {statuses[status]}
      </Badge>
    );
  }
  return <Badge variant={status === 'cancelled' ? 'destructive' : 'default'}>{status}</Badge>;
};

export default OrderStatusBadge;
