import Image from 'next/image';

import { DataTable } from '@/components/data-table/data-table';
import OrdersTable from '@/components/orders-table/orders-table';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container';
import { fetchOrdersSSR } from '@/lib/orders';

export default async function Home() {
  const data = await fetchOrdersSSR(1, 30);
  console.log(data);

  return (
    <Container as="main">
      <OrdersTable initialData={data} />
    </Container>
  );
}
