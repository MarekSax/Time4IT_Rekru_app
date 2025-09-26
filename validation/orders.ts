import * as z from 'zod';

export const addOrderSchema = z.object({
  orderNumber: z
    .string()
    .nonempty('Pole nie może być puste')
    .regex(/^ORD-\d{4}-\d{4}$/, 'Niepoprawny format numeru zamówienia.'),
  customer: z.string().nonempty('Pole nie może być puste').min(2, 'Wymagane, min. 2 znaki.'),
  status: z.enum(['new', 'processing', 'shipped', 'delivered', 'cancelled'] as const),
  totalGross: z.number().min(0, 'Kwota musi być większa lub równa 0'),
  dueDate: z
    .string()
    .nonempty('Pole nie może być puste')
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Format YYYY-MM-DD.'),
});

export type AddOrderSchema = z.infer<typeof addOrderSchema>;
