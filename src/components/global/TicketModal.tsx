import Image from 'next/image';
import React from 'react';

import { capitalize, cn, formatDate } from '@/lib/utils';
import useFetch from '@/hooks/useFetch';

import { Category, Transaction } from '@/types/api';

interface TicketModalProps {
  isOpen: boolean;
  toggleModal: () => void;
  transaction: Transaction | null;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const TicketModal: React.FC<TicketModalProps> = ({
  isOpen,
  toggleModal,
  transaction,
  onClick,
}) => {
  const categoryId = transaction?.item_request?.category_id;

  const { data: category } = useFetch<Category>(
    `http://localhost:8080/api/category/${categoryId}`,
  );

  if (!isOpen || !transaction) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-lexend'
      onClick={onClick}
    >
      <div
        className='relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-8 shadow-lg'
        onClick={(e) => e.stopPropagation()}
      >
        <p className='mb-6 text-2xl font-bold text-gray-800'>
          Transaction Ticket
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
                  src={`data:image/jpeg;base64,${transaction.image}`}
                  alt={`Image from ${transaction.employee_name}`}
                  width={500}
                  height={500}
                  className='rounded-md border border-gray-200'
                />
              </div>
            </div>
          )}

          <p>
            <span className='font-semibold'>Nama Pemesan:</span>{' '}
            {transaction?.employee_name}
          </p>

          <p>
            <span className='font-semibold'>Status Pemesanan:</span>
            <span
              className={cn(
                'rounded-full px-2 py-1 font-lexend text-sm font-medium',
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
          </p>

          {transaction.transaction_type === 'loan' && (
            <p>
              <span className='font-semibold'>Tanggal Pengembalian:</span>{' '}
              {formatDate(transaction?.return_time)}
            </p>
          )}

          <p>
            <span className='font-semibold'>Kategori Item:</span>{' '}
            {category?.name}
          </p>

          <p>
            <span className='font-semibold'>Nama Item:</span>{' '}
            {transaction?.item_request?.name}
          </p>

          <p>
            <span className='font-semibold'>
              {transaction.transaction_type === 'inquiry'
                ? 'Jumlah Permintaan:'
                : transaction.transaction_type === 'loan'
                  ? 'Jumlah Peminjaman:'
                  : 'Jumlah Penambahan:'}
            </span>{' '}
            {transaction?.item_request?.quantity}
          </p>

          <p>
            <span className='font-semibold'>Rak Item:</span>{' '}
            {transaction?.item_request?.shelf}
          </p>

          <p>
            <span className='font-semibold'>Notes:</span> {transaction?.notes}
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

export default TicketModal;
