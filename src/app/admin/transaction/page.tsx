'use client';

import React from 'react';
import { MdOutlineFileDownload } from 'react-icons/md';

import { capitalize, cn, formatDate } from '@/lib/utils';
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
  'Tanggal Complete',
  'Status',
  'Ticket',
  'Action',
];

export default function AdminTransactionsPage() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    React.useState<Transaction | null>(null);
  const [transactionSearch, setTransactionSearch] = React.useState('');
  const [transactionResult, setTransactionResult] = React.useState('');
  const [selectedTransactionId, setSelectedTransactionId] = React.useState<
    string | null
  >(null);
  const [actionType, setActionType] = React.useState<
    'approve' | 'reject' | 'complete' | 'incomplete' | 'return' | null
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

  const sortedTransactions = [...filteredTransactions].sort(
    (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime(),
  );

  const { data: approveResponse, executeRequest: approveRequest } = useFetch(
    `http://localhost:8080/api/transaction/${selectedTransactionId}/approved`,
    'PATCH',
  );

  const { data: rejectResponse, executeRequest: rejectRequest } = useFetch(
    `http://localhost:8080/api/transaction/${selectedTransactionId}/rejected`,
    'PATCH',
  );

  const { data: completeResponse, executeRequest: completeRequest } = useFetch(
    `http://localhost:8080/api/transaction/${selectedTransactionId}/completed`,
    'PATCH',
  );

  const { data: incompleteResponse, executeRequest: incompleteRequest } =
    useFetch(
      `http://localhost:8080/api/transaction/${selectedTransactionId}/incomplete`,
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
      } else if (actionType === 'complete') {
        completeRequest();
      } else if (actionType === 'incomplete') {
        incompleteRequest();
      } else if (actionType === 'return') {
        returnRequest();
      }
    }
  }, [
    selectedTransactionId,
    actionType,
    approveRequest,
    rejectRequest,
    completeRequest,
    incompleteRequest,
    returnRequest,
  ]);

  React.useEffect(() => {
    if (
      approveResponse ||
      rejectResponse ||
      completeResponse ||
      incompleteResponse ||
      returnResponse
    ) {
      window.location.reload();
    }
  }, [
    approveResponse,
    rejectResponse,
    completeResponse,
    incompleteResponse,
    returnResponse,
  ]);

  const handleApproveClick = (transactionId: string) => {
    setSelectedTransactionId(transactionId);
    setActionType('approve');
  };

  const handleRejectClick = (transactionId: string) => {
    setSelectedTransactionId(transactionId);
    setActionType('reject');
  };

  const handleCompleteClick = (transactionId: string) => {
    setSelectedTransactionId(transactionId);
    setActionType('complete');
  };

  const handleIncompleteClick = (transactionId: string) => {
    setSelectedTransactionId(transactionId);
    setActionType('incomplete');
  };

  const handleReturnClick = (transactionId: string) => {
    setSelectedTransactionId(transactionId);
    setActionType('return');
  };

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const downloadCSV = async (e: any) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:8080/api/transactions/export`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const data = await response.blob();

    const blob = new Blob([data], { type: 'csv' });

    const a = document.createElement('a');
    a.download = 'transactions.csv';
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };
  /* eslint-enable @typescript-eslint/no-explicit-any */

  return (
    <main className='space-y-6'>
      <SearchInput
        placeholder='Cari Transaksi'
        value={transactionSearch}
        onChange={(e) => setTransactionSearch(e.target.value)}
        containerStyles='w-full'
      />

      <div className='flex items-center justify-between'>
        <p className='font-lexend text-2xl font-semibold text-white'>
          Pengambilan berlaku di hari yang sama dengan pemesanan serta di jam
          kerja (08:00-16:00)
        </p>

        <button
          onClick={downloadCSV}
          className='flex items-center gap-2 rounded-lg bg-red-800 px-4 py-2 font-lexend font-bold text-white shadow-light hover:bg-third hover:shadow-bold'
        >
          Download Transaction
          <MdOutlineFileDownload size={24} />
        </button>
      </div>

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
                        {transaction.completed_time === null
                          ? '-'
                          : formatDate(transaction.completed_time)}
                      </TableCell>
                      <TableCell className='py-2 text-center font-lexend font-medium'>
                        <span
                          className={cn(
                            'rounded-full px-2 py-1 font-lexend text-sm font-medium',
                            transaction.status === 'pending' ||
                              transaction.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : transaction.status === 'approved' ||
                                  transaction.status === 'Approved'
                                ? 'bg-green-100 text-green-800'
                                : transaction.status === 'completed' ||
                                    transaction.status === 'Completed'
                                  ? 'bg-orange-100 text-orange-800'
                                  : transaction.status === 'incomplete' ||
                                      transaction.status === 'Incomplete'
                                    ? 'bg-slate-700 text-slate-100'
                                    : transaction.status === 'returned' ||
                                        transaction.status === 'Returned'
                                      ? 'bg-blue-100 text-blue-800'
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
                          ) : transaction.status === 'approved' ||
                            transaction.status === 'Approved' ? (
                            <>
                              <button
                                className='w-20 rounded bg-orange-600 py-1 font-lexend font-bold text-white transition duration-300 hover:bg-orange-700'
                                onClick={() =>
                                  handleCompleteClick(transaction.uuid)
                                }
                              >
                                Complete
                              </button>
                              <button
                                className='w-20 rounded bg-slate-600 px-1 py-1.5 font-lexend text-xs font-bold text-white transition duration-300 hover:bg-slate-700'
                                onClick={() =>
                                  handleIncompleteClick(transaction.uuid)
                                }
                              >
                                Incomplete
                              </button>
                            </>
                          ) : transaction.transaction_type === 'loan' &&
                            transaction.status === 'completed' ? (
                            <button
                              className='w-20 rounded bg-blue-600 px-3 py-1 font-lexend font-bold text-white transition duration-300 hover:bg-blue-700'
                              onClick={() =>
                                handleReturnClick(transaction.uuid)
                              }
                            >
                              Return
                            </button>
                          ) : transaction.status === 'incomplete' ? (
                            <div className='font-lexend font-bold text-slate-700'>
                              INCOMPLETE
                            </div>
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
