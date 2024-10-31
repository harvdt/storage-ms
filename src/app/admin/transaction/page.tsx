'use client';

import React from 'react';

import { cn } from '@/lib/utils';
import useFetch from '@/hooks/useFetch';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Transaction } from '@/types/api';

const tableHeader = [
  'Nama Pemesan',
  'Jenis Request',
  'Divisi',
  'Jabatan',
  'Tanggal Pemesanan',
  'Status',
  'Detail',
  'Action',
];

export default function Transactions() {
  const {
    data: transactions,
    loading: transactionsLoading,
    error: transactionsError,
  } = useFetch<Transaction[]>('http://localhost:8080/api/transactions');

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  }

  return (
    <main className='container mx-auto'>
      <div className='h-[45rem] w-[80rem] overflow-hidden rounded-lg bg-white shadow-lg'>
        {transactionsLoading && <p>Loading transactions...</p>}
        {transactionsError && (
          <p>Error loading transactions: {transactionsError.message}</p>
        )}
        {!transactionsLoading && transactions && (
          <Table>
            <TableHeader>
              <TableRow className='bg-gradient-to-r from-main to-secondary'>
                {tableHeader.map((item, index) => (
                  <TableHead
                    key={index}
                    className='py-3 text-center font-lexend font-bold text-white'
                  >
                    {item}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell className='py-2 text-center font-lexend font-medium'>
                    {transaction.employee_name}
                  </TableCell>
                  <TableCell className='py-2 text-center font-lexend font-medium'>
                    {transaction.transaction_type}
                  </TableCell>
                  <TableCell className='py-2 text-center font-lexend font-medium'>
                    {transaction.employee_department}
                  </TableCell>
                  <TableCell className='py-2 text-center font-lexend font-medium'>
                    {transaction.employee_position}
                  </TableCell>
                  <TableCell className='py-2 text-center font-lexend font-medium'>
                    {formatDate(transaction.time)}
                  </TableCell>
                  <TableCell className='py-2 text-center font-lexend font-medium'>
                    <span
                      className={cn(
                        'font-lenxed rounded-full px-2 py-1 text-xs font-medium',
                        transaction.status === 'Approved'
                          ? 'bg-green-100 text-green-800'
                          : transaction.status === 'Ongoing'
                            ? 'bg-orange-100 text-orange-500'
                            : 'bg-red-100 text-red-800',
                      )}
                    >
                      {transaction.status}
                    </span>
                  </TableCell>
                  <TableCell className='py-2 text-center'>
                    <button className='rounded bg-main px-4 py-1.5 font-lexend text-sm font-semibold text-white transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-main focus:ring-offset-2'>
                      Detail
                    </button>
                  </TableCell>
                  <TableCell className='py-2 text-center'>
                    <div className='flex items-center justify-center space-x-2'>
                      <button className='rounded bg-green-600 px-4 py-1.5 font-lexend text-sm font-semibold text-white transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2'>
                        Approve
                      </button>
                      <button className='rounded bg-red-600 px-4 py-1.5 font-lexend text-sm font-semibold text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2'>
                        Reject
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </main>
  );
}
