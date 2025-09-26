import OrdersTable from '@/components/orders-table/orders-table';
import Container from '@/components/ui/container';
import { fetchOrders } from '@/lib/orders';

export default async function Home() {
  const data = await fetchOrders(1, 7);
  console.log(data);

  return (
    <Container as="main">
      <OrdersTable initialData={data} />
    </Container>
  );
}
