'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import { capitalize, cn, formatDate } from '@/lib/utils';
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
        className='relative w-[28rem] rounded-lg bg-white p-8 shadow-lg'
        onClick={(e) => e.stopPropagation()}
      >
        <p className='mb-6 text-2xl font-bold text-gray-800'>
          Detail Transaction
        </p>
        <hr className='mb-6 border-gray-300' />

        <div className='space-y-4 text-gray-700'>
          <p className='text-center font-lexend text-xl font-bold'>
            {transaction.transaction_type === 'loan'
              ? 'Peminjaman'
              : transaction.transaction_type === 'inquiry'
                ? 'Permintaan'
                : 'Add Item'}
          </p>

          {(transaction.transaction_type === '' ||
            transaction.transaction_type === 'insert') && (
            <div>
              <p className='font-semibold text-gray-800'>Foto Bukti:</p>
              <div className='mt-2'>
                <Image
                  src='/public/images/pulpen.png' //{`data:image/jpeg;base64,${transaction.image}`}
                  alt={`Image for ${transaction.employee_name}`}
                  width={120}
                  height={120}
                  className='rounded-md border border-gray-200'
                />
              </div>
            </div>
          )}

          <p>
            <span className='font-semibold'>Nama Item:</span>{' '}
            {transaction.item.name}
          </p>

          <p>
            <span className='font-semibold'>Jumlah Permintaan:</span>{' '}
            {transaction.quantity}
          </p>

          <p>
            <span className='font-semibold'>Jumlah Item Tersedia:</span>{' '}
            {transaction.item.quantity}
          </p>

          <p>
            <span className='font-semibold'>Rak Item:</span>{' '}
            {transaction.item.shelf}
          </p>

          {transaction.transaction_type === 'loan' && (
            <p>
              <span className='font-semibold'>Tanggal Pengembalian:</span>{' '}
              {formatDate(transaction.return_time)}
            </p>
          )}

          <p>
            <span className='font-semibold'>Notes:</span> {transaction.notes}
          </p>
        </div>

        <button
          className='hover:bg-main-dark mt-8 w-full rounded-lg bg-main px-4 py-3 font-medium text-white transition duration-150 hover:bg-secondary'
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
  const [actionType, setActionType] = useState<
    'approve' | 'reject' | 'return' | null
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

  const { data: approveResponse, executeRequest: approveRequest } = useFetch(
    `http://localhost:8080/api/transaction/${selectedTransactionId}/approved`,
    'PATCH',
  );

  const { data: rejectResponse, executeRequest: rejectRequest } = useFetch(
    `http://localhost:8080/api/transaction/${selectedTransactionId}/rejected`,
    'PATCH',
  );

  const { data: returnResponse, executeRequest: returnRequest } = useFetch(
    `http://localhost:8080/api/transaction/${selectedTransactionId}/returned`,
    'PATCH',
  );

  React.useEffect(() => {
    if (selectedTransactionId && actionType) {
      if (actionType === 'approve') {
        approveRequest();
      } else if (actionType === 'reject') {
        rejectRequest();
      } else if (actionType === 'return') {
        returnRequest();
      }
    }
  }, [
    selectedTransactionId,
    actionType,
    approveRequest,
    rejectRequest,
    returnRequest,
  ]);

  React.useEffect(() => {
    if (approveResponse || rejectResponse || returnResponse) {
      window.location.reload();
    }
  }, [approveResponse, rejectResponse, returnResponse]);

  const handleApproveClick = (transactionId: string) => {
    setSelectedTransactionId(transactionId);
    setActionType('approve');
  };

  const handleRejectClick = (transactionId: string) => {
    setSelectedTransactionId(transactionId);
    setActionType('reject');
  };

  const handleReturnClick = (transactionId: string) => {
    setSelectedTransactionId(transactionId);
    setActionType('return');
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
                          Detail
                        </button>
                      </TableCell>
                      <TableCell className='py-2 text-center'>
                        <div className='flex items-center justify-center gap-x-2'>
                          {transaction.status === 'pending' ||
                          transaction.status === 'Pending' ? (
                            <>
                              <button
                                className='w-20 rounded bg-green-600 px-3 py-1 font-lexend font-bold text-white transition duration-300 hover:bg-green-700'
                                onClick={() =>
                                  handleApproveClick(transaction.uuid)
                                }
                              >
                                Approve
                              </button>
                              <button
                                className='w-20 rounded bg-main px-3 py-1 font-lexend font-bold text-white transition duration-300 hover:bg-secondary'
                                onClick={() =>
                                  handleRejectClick(transaction.uuid)
                                }
                              >
                                Reject
                              </button>
                            </>
                          ) : transaction.transaction_type === 'loan' &&
                            transaction.status === 'approved' ? (
                            <>
                              <button
                                className='w-20 rounded bg-blue-600 px-3 py-1 font-lexend font-bold text-white transition duration-300 hover:bg-blue-700'
                                onClick={() =>
                                  handleReturnClick(transaction.uuid)
                                }
                              >
                                Return
                              </button>
                            </>
                          ) : (
                            <div className='font-lexend font-bold text-orange-600'>
                              COMPLETED
                            </div>
                          )}
                        </div>
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
