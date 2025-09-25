import type { Column } from '@tanstack/react-table';
import Image from 'next/image';
import type { ReactNode } from 'react';

import { Button } from '../ui/button';

interface HeaderButtonProps<TData, TValue> {
  column: Column<TData, TValue>;
  children: ReactNode;
}
const HeaderButton = <TData, TValue>({ column, children }: HeaderButtonProps<TData, TValue>) => {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      className="gap-1 p-0 text-xs font-semibold text-gray-500"
    >
      {children}
      <Image src="/images/icons/chevron-selector-vertical.svg" width={12} height={12} alt="Sort" unoptimized />
    </Button>
  );
};

export default HeaderButton;
