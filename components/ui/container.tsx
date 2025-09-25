import { ElementType } from 'react';

import { cn } from '@/lib/utils';

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: ElementType;
};
const Container = ({ children, className, id, as: Tag = 'div' }: ContainerProps) => {
  return (
    <Tag id={id} className={cn('mx-auto max-w-[1280px] px-8', className)}>
      {children}
    </Tag>
  );
};

export default Container;
