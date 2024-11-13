'use client';

import React, { useState } from 'react';

import { cn } from '@/lib/utils';
import useFetch from '@/hooks/useFetch';

import ErrorState from '@/components/global/ErrorState';
import LoadingState from '@/components/global/LoadingState';
import NoItemsFound from '@/components/global/NoItemsFound';
import SearchInput from '@/components/global/SearchInput';
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
  'Detail',
  'Action',
];

const DetailModal = ({
  isOpen,
  toggleModal,
  transaction,
  onClick,
}: {
  isOpen: boolean;
  toggleModal: () => void;
  transaction: Transaction | null;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}) => {
  if (!isOpen || !transaction) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-lexend'
      onClick={onClick}
    >
      <div
        className='relative w-[28rem] rounded-lg bg-white p-6 shadow-lg'
        onClick={(e) => e.stopPropagation()}
      >
        <p className='text-xl font-bold'>Detail Transaction</p>
        <hr className='my-4' />
        <div className='mb-4 space-y-2'>
          <p>Nama Item: {transaction.item.name}</p>
          <p>Jumlah Permintaan: {transaction.quantity}</p>
          <p>Jumlah Item Tersedia: {transaction.item.quantity}</p>
          <p>Notes: {transaction.notes}</p>
        </div>
        <button
          className='mt-4 w-full rounded bg-main px-4 py-2 text-white'
          onClick={toggleModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default function AdminTransactionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [transactionSearch, setTransactionSearch] = useState('');
  const [transactionResult, setTransactionResult] = useState('');
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    string | null
  >(null);

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

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  }

  const { data: approveResponse, executeRequest: approveRequest } = useFetch(
    `http://localhost:8080/api/transaction/${selectedTransactionId}/approve`,
    'PUT',
  );

  React.useEffect(() => {
    if (approveResponse) {
      window.location.reload();
    }
  }, [approveResponse]);

  const handleApproveClick = (transactionId: string) => {
    setSelectedTransactionId(transactionId);
    approveRequest();
  };

  return (
    <main className='space-y-6'>
      <SearchInput
        placeholder='Cari Transaksi'
        value={transactionSearch}
        onChange={(e) => setTransactionSearch(e.target.value)}
        containerStyles='w-full'
      />

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
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction, index) => (
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
                              transaction.status === 'returned'
                              ? 'bg-green-100 text-green-800'
                              : transaction.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800',
                          )}
                        >
                          {transaction.status}
                        </span>
                      </TableCell>
                      <TableCell className='py-2 text-center'>
                        <button
                          className='rounded bg-main px-3 py-1 font-lexend font-bold text-white transition duration-300 hover:bg-secondary'
                          onClick={() => handleDetailClick(transaction)}
                        >
                          Detail
                        </button>
                      </TableCell>
                      <TableCell className='space-x-2 py-2 text-center'>
                        <button
                          className='rounded bg-green-600 px-3 py-1 font-lexend font-bold text-white transition duration-300 hover:bg-green-700'
                          onClick={() => handleApproveClick(transaction.uuid)}
                        >
                          Approve
                        </button>

                        <button className='rounded bg-main px-3 py-1 font-lexend font-bold text-white transition duration-300 hover:bg-secondary'>
                          Reject
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

            <DetailModal
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
