'use client';

import React, { useState } from 'react';

import { capitalize, cn } from '@/lib/utils';
import useFetch from '@/hooks/useFetch';

import ErrorState from '@/components/global/ErrorState';
import LoadingState from '@/components/global/LoadingState';
import NoItemsFound from '@/components/global/NoItemsFound';
import SearchInput from '@/components/global/SearchInput';
import TicketModal from '@/components/global/TicketModal';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import useDebounce from '@/utils/helper';

import { Transaction } from '@/types/api';

const tableHeader = [
  'Nama Pemesan',
  'Jenis Request',
  'Divisi',
  'Jabatan',
  'Tanggal Pemesanan',
  'Status',
  'Ticket',
];

export default function UserTransactionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [transactionSearch, setTransactionSearch] = useState('');
  const [transactionResult, setTransactionResult] = useState('');

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleDetailClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    toggleModal();
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target) {
      toggleModal();
    }
  };

  const {
    data: transactions,
    loading: transactionsLoading,
    error: transactionsError,
  } = useFetch<Transaction[]>('http://localhost:8080/api/transactions');

  const debounce = useDebounce(transactionSearch);

  React.useEffect(() => {
    setTransactionResult(debounce);
  }, [debounce]);

  const filteredTransactions = Array.isArray(transactions)
    ? transactions.filter((transaction) =>
        transaction.employee_name
          .toLowerCase()
          .includes(transactionResult.toLowerCase()),
      )
    : [];

  const sortedTransactions = [...filteredTransactions].sort(
    (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime(),
  );

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
    <main className='space-y-6'>
      {/* Search input for transactions */}
      <SearchInput
        placeholder='Cari Transaksi'
        value={transactionSearch}
        onChange={(e) => setTransactionSearch(e.target.value)}
        containerStyles='w-full'
      />

      <p className='font-lexend text-2xl font-semibold text-white'>
        Pengambilan berlaku di hari yang sama dengan pemesanan serta di jam
        kerja (08:00-16:00)
      </p>

      {/* Transaction table container */}
      <div className='max-h-screen overflow-hidden rounded-lg bg-white shadow-lg'>
        {transactionsLoading ? (
          <LoadingState />
        ) : transactionsError ? (
          <ErrorState
            message={`Error: ${transactionsError.message || 'Terjadi kesalahan'}`}
          />
        ) : transactions && transactions.length > 0 ? (
          <>
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
                {sortedTransactions.length > 0 ? (
                  sortedTransactions.map((transaction, index) => (
                    <TableRow key={index}>
                      <TableCell className='py-2 text-center font-lexend font-medium'>
                        {transaction.employee_name}
                      </TableCell>
                      <TableCell className='py-2 text-center font-lexend font-medium'>
                        {transaction.transaction_type === 'loan'
                          ? 'Peminjaman'
                          : transaction.transaction_type === 'inquiry'
                            ? 'Permintaan'
                            : 'Add Item'}
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
                            'rounded-full px-2 py-1 font-lexend text-xs font-medium',
                            transaction.status === 'approved' ||
                              transaction.status === 'Approved'
                              ? 'bg-green-100 text-green-800'
                              : transaction.status === 'returned' ||
                                  transaction.status === 'Returned'
                                ? 'bg-blue-100 text-blue-800'
                                : transaction.status === 'pending' ||
                                    transaction.status === 'Pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800',
                          )}
                        >
                          {capitalize(transaction.status)}
                        </span>
                      </TableCell>
                      <TableCell className='py-2 text-center'>
                        <button
                          className='rounded bg-main px-3 py-1 font-lexend font-bold text-white transition duration-300 hover:bg-secondary'
                          onClick={() => handleDetailClick(transaction)}
                        >
                          Ticket
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className='text-center'>
                      <NoItemsFound
                        message='Transaksi Tidak Ditemukan'
                        textStyles='text-black'
                      />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {/* Ticket modal */}
            <TicketModal
              isOpen={isModalOpen}
              toggleModal={toggleModal}
              transaction={selectedTransaction}
              onClick={handleOverlayClick}
            />
          </>
        ) : (
          <NoItemsFound
            message='Tidak ada transaksi yang tersedia'
            containerStyles='py-10'
            textStyles='text-black'
          />
        )}
      </div>
    </main>
  );
}
