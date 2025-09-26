'use client';

import { DropdownMenuItemIndicator } from '@radix-ui/react-dropdown-menu';
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Image from 'next/image';
import { useState } from 'react';

import { cn } from '@/lib/utils';

import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  total: number;
  pagination: { pageIndex: number; pageSize: number };
  onPaginationChange: (updater: any) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  total,
  pagination,
  onPaginationChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: { sorting, pagination, columnVisibility },
    manualPagination: true,
    pageCount: Math.ceil(total / pagination.pageSize),
    onPaginationChange,
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="mr-5">
          <Button
            variant="outline"
            className="ml-auto h-10 gap-1 border-gray-300 px-[14px] py-2.5 text-sm font-semibold text-gray-700"
          >
            Konfiguruj widok
            <Image src="/images/icons/chevron-down.svg" width={20} height={20} alt="Sort" unoptimized />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="mt-4 h-[197px] min-w-[189px] overflow-y-scroll px-1.5 py-1">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuItem
                  key={column.id}
                  onClick={() => column.toggleVisibility(!column.getIsVisible())}
                  className="flex items-center gap-2 p-2 capitalize"
                >
                  <span
                    className={cn(
                      'flex size-4 items-center justify-center rounded-sm border text-sm font-medium text-gray-900',
                      column.getIsVisible() ? 'bg-brand-600' : 'bg-white',
                    )}
                  >
                    {column.getIsVisible() && (
                      <Image src="/images/icons/check.svg" width={12} height={12} alt="Sort" unoptimized />
                    )}
                  </span>
                  {column.id}
                </DropdownMenuItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="overflow-hidden border-t border-b">
        <Table className="w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="text-xs font-semibold text-gray-500">
                {headerGroup.headers.map((header, index) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn('w-auto px-0 py-[13px] text-xs font-semibold', index === 1 ? 'w-[592px]' : '')}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="border-t border-b">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="h-fit w-auto px-0 py-[26px] text-sm font-normal text-gray-900">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between space-x-2 px-6 py-4">
          <p>
            Strona {table.getState().pagination.pageIndex + 1} z {table.getPageCount()}
          </p>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="h-9 px-3 py-2 text-sm font-semibold text-gray-700"
            >
              Poprzednia
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="h-9 px-3 py-2 text-sm font-semibold text-gray-700"
            >
              Następna
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
