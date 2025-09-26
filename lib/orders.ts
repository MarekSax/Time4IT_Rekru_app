import { Order, OrdersPage } from './orders-types';

const API_URL = 'http://localhost:3000/api/orders';

export async function fetchOrders(page = 1, perView = 10): Promise<OrdersPage> {
  const res = await fetch(`${API_URL}?page=${page}&perPage=${perView}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch orders');
  return res.json();
}

export async function deleteOrder(id: Order['id']) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Failed to delete order');
  }
  return res.json();
}

export async function addOrder(order: Omit<Order, 'id'>) {
  const res = await fetch(`${API_URL}`, {
    method: 'POST',
    body: JSON.stringify(order),
  });
  if (!res.ok) {
    throw new Error('Failed to add order');
  }
  return res.json();
}
