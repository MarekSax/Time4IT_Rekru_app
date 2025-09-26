import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

import type { Order, OrderStatus } from '@/lib/orders-types';
import { addOrderSchema } from '@/validation/orders';

import { Button } from '../ui/button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Form } from '../ui/form';
import FormInput from '../ui/form-input';
import FormSelect from '../ui/form-select';

interface AddOrderDialogProps {
  open: boolean;
  setDialogOpen: (open: boolean) => void;
  handleConfirmAdd: (newOrder: Omit<Order, 'id'>) => void;
}

interface FormValues {
  customer: string;
  orderNumber: string;
  status: OrderStatus;
  totalGross: number;
  dueDate: string;
}

const statusOptions = [
  { label: 'Nowe', value: 'new' },
  { label: 'Przygotowanie', value: 'processing' },
  { label: 'Wysłane', value: 'shipped' },
  { label: 'Dostarczone', value: 'delivered' },
  { label: 'Anulowane', value: 'cancelled' },
];

const AddOrderDialog = ({ open, setDialogOpen, handleConfirmAdd }: AddOrderDialogProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(addOrderSchema),
    mode: 'onBlur',
    defaultValues: {
      customer: '',
      orderNumber: '',
      status: 'new',
      totalGross: undefined,
      dueDate: new Date().toISOString().split('T')[0],
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    handleConfirmAdd(data);
    form.reset();
    setDialogOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setDialogOpen}>
      <DialogContent className="min-w-[640px] p-6">
        <DialogHeader>
          <DialogTitle>Dodaj zamówienie</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormInput control={form.control} name="customer" label="Nazwa Klienta" placeholder="Podaj nazwę klienta" />

            <div className="flex gap-4">
              <FormInput
                control={form.control}
                name="orderNumber"
                label="Numer zamówienia"
                placeholder="Podaj numer zamówienia"
                className="min-w-[280px]"
              />
              <FormSelect
                control={form.control}
                name="status"
                label="Status zamówienia"
                options={statusOptions}
                className="min-w-[128px]"
              />
            </div>
            <FormInput
              control={form.control}
              name="totalGross"
              label="Kwota"
              placeholder="Podaj kwotę brutto zamówienia"
              type="number"
            />
            <div className="flex gap-3">
              <DialogClose asChild>
                <Button className="h-11 flex-1 cursor-pointer border border-gray-300 bg-white px-4 py-2.5 text-base font-semibold text-gray-700 transition-colors duration-150 hover:bg-gray-200">
                  Anuluj
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="bg-brand-600 hover:bg-brand-700 h-11 flex-1 cursor-pointer border border-gray-300 px-4 py-2.5 text-base font-semibold text-white transition-colors duration-150"
              >
                Dodaj zamówienie
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddOrderDialog;
