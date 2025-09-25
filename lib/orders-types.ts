export type OrderStatus = 'new' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  status: OrderStatus;
  dueDate: string;
  totalGross: number;
}
export interface OrdersPage {
  items: Order[];
  page: number;
  perView: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ApiList<T> {
  items: T[];
}
