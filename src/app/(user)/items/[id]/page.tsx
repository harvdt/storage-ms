'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { FormEvent } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';

import { cn } from '@/lib/utils';
import useFetch from '@/hooks/useFetch';

import { divisi } from '../_data/Division';

import {
  CategoryWithItems,
  TransactionField,
  TransactionPayload,
} from '@/types/api';

export default function UserItemPage({ params }: { params: { id: string } }) {
  const [selectedItem, setSelectedItem] = React.useState<{
    id: number;
    name: string;
    quantity: number;
    shelf: string;
  } | null>(null);

  const [selectedRequest, setSelectedRequest] = React.useState('loaned');

  const formRef = React.useRef<HTMLFormElement>(null);

  // Fetch categories with items using the ID from params
  const { data: category } = useFetch<CategoryWithItems>(
    `http://localhost:8080/api/category/${params.id}/items`,
  );

  const { data: response, executeRequest } = useFetch(
    selectedRequest === 'loaned'
      ? 'http://localhost:8080/api/transaction/loan'
      : 'http://localhost:8080/api/transaction/inquiry',
    'POST',
  );

  // Reset & reload after send the data is success
  React.useEffect(() => {
    if (response) {
      formRef.current?.reset();
      window.location.reload();
    }
  }, [response]);

  if (!category) {
    return <div>Tidak ada kategori</div>;
  }

  //   Form handling
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formRef.current || !selectedItem) return;

    if (selectedItem.quantity <= 0) {
      alert('Stok barang habis!');
      return;
    }

    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries()) as TransactionField;

    const basePayload = {
      item_id: selectedItem.id,
      quantity: Number(data.quantity),
      employee_name: data.employee_name,
      employee_department: data.employee_department,
      employee_position: data.employee_position,
      status: 'loaned',
      time: new Date().toISOString(),
      return_time: data.time ? new Date(data.time).toISOString() : '',
      notes: data.notes || '',
    };

    if (selectedRequest === 'loaned') {
      const loanPayload: TransactionPayload = {
        ...basePayload,
        status: 'loaned',
        loan_time: new Date().toISOString(),
        return_time: data.time ? new Date(data.time).toISOString() : '',
      };

      await executeRequest(loanPayload);
    } else {
      const inquiryPayload: TransactionPayload = {
        ...basePayload,
        status: 'inquired',
      };

      await executeRequest(inquiryPayload);
    }
  };

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const today = new Date();
  const todayMessage = `Maksimal Pengambilan ${today.toLocaleDateString('id-ID', options)} Jam 16:00`;

  return (
    <main>
      <div className='relative mb-6 w-full rounded-lg px-20 py-16 shadow-lg'>
        <div className='absolute inset-0 z-[-1] rounded-lg bg-white opacity-50' />

        {/* Back Button */}
        <Link href='/items' className='absolute left-4 top-4'>
          <IoMdArrowRoundBack
            size={36}
            className='cursor-pointer hover:text-secondary'
          />
        </Link>

        {/* Main Content Grid */}
        <div className='grid grid-cols-1 gap-32 md:grid-cols-2'>
          {/* Left Column: Order Title & Image */}
          <div className='flex flex-col items-center'>
            <div className='mb-4 w-full rounded-lg bg-gradient-to-r from-main to-secondary py-3 text-center shadow-light'>
              <p className='font-lexend text-4xl font-bold text-white'>Order</p>
            </div>
            <Image
              src={`data:image/jpeg;base64,${category.image}`}
              height={500}
              width={500}
              className='rounded-lg object-contain'
              alt='Image'
            />
          </div>

          {/* Right Column: Product Details and Actions */}
          <div className='space-y-6'>
            {/* Product Info */}
            <div className='space-y-4 rounded-lg bg-gradient-to-r from-main to-secondary p-6 font-lexend text-white'>
              <p className='text-2xl font-bold'>{category.name}</p>
              <p className='text-sm'>
                Stok:{' '}
                {selectedItem
                  ? selectedItem.quantity
                  : 'Pilih item untuk melihat stok'}
              </p>

              {/* Items Options */}
              <div className='grid grid-cols-2 gap-2 md:grid-cols-4'>
                {category.items.map((item) => (
                  <button
                    key={item.id}
                    className={cn(
                      'rounded-lg bg-white px-4 py-2 text-main shadow-light hover:shadow-bold',
                      'hover:bg-third hover:text-white',
                      selectedItem?.name === item.name &&
                        'bg-third text-white shadow-bold',
                    )}
                    onClick={() =>
                      setSelectedItem({
                        id: item.id,
                        name: item.name,
                        quantity: item.quantity,
                        shelf: item.shelf,
                      })
                    }
                  >
                    <p className='font-lexend text-sm font-bold'>{item.name}</p>
                  </button>
                ))}
              </div>

              {/* Location Info */}
              <div className='flex justify-between pr-48 text-sm'>
                <p>Gudang: {category.storage.name}</p>
                <p>Rak: {selectedItem?.shelf}</p>
              </div>
            </div>

            {/* Quantity Control */}
            <div className='space-y-4 rounded-lg bg-gradient-to-r from-main to-secondary p-6 font-lexend text-white'>
              <p className='text-3xl font-bold'>Form Pemesanan</p>

              <form ref={formRef} onSubmit={handleSubmit} className='space-y-4'>
                <div className='space-y-2'>
                  <label
                    htmlFor='employee_name'
                    className='block text-sm font-semibold'
                  >
                    Nama
                  </label>
                  <input
                    id='employee_name'
                    name='employee_name'
                    type='text'
                    className='w-full rounded-md bg-white p-2 text-main outline-none'
                  />
                </div>

                <div className='space-y-2'>
                  <label
                    htmlFor='employee_department'
                    className='block text-sm font-semibold'
                  >
                    Divisi
                  </label>
                  <select
                    id='employee_department'
                    name='employee_department'
                    className='w-full rounded-md bg-white p-2 text-main outline-none'
                  >
                    {divisi.map((divisi, index) => (
                      <option key={index}>{divisi.name}</option>
                    ))}
                  </select>
                </div>

                <div className='space-y-2'>
                  <label
                    htmlFor='employee_position'
                    className='block text-sm font-semibold'
                  >
                    Jabatan
                  </label>
                  <input
                    id='employee_position'
                    name='employee_position'
                    type='text'
                    className='w-full rounded-md bg-white p-2 text-main outline-none'
                  />
                </div>

                <div className='space-y-2'>
                  <label
                    htmlFor='status'
                    className='block text-sm font-semibold'
                  >
                    Jenis Request
                  </label>
                  <select
                    id='status'
                    name='status'
                    className='w-full rounded-md bg-white p-2 text-main outline-none'
                    value={selectedRequest}
                    onChange={(e) => setSelectedRequest(e.target.value)}
                  >
                    <option value='loaned'>Peminjaman</option>
                    <option value='inquired'>Permintaan</option>
                  </select>
                </div>

                {/* Return Time Input */}
                {selectedRequest === 'loaned' && (
                  <div className='space-y-2'>
                    <label
                      htmlFor='time'
                      className='block text-sm font-semibold'
                    >
                      Waktu Kembali
                    </label>
                    <input
                      id='time'
                      name='time'
                      type='datetime-local'
                      className='w-full rounded-md bg-white p-2 text-main outline-none'
                      required
                    />
                  </div>
                )}

                <div className='space-y-2'>
                  <label className='block text-sm font-semibold'>Jumlah</label>
                  <input
                    type='number'
                    id='quantity'
                    name='quantity'
                    placeholder='1'
                    className='w-full rounded-md bg-white p-2 text-main outline-none'
                  />
                </div>

                <div className='space-y-2'>
                  <label
                    htmlFor='notes'
                    className='block text-sm font-semibold'
                  >
                    Notes
                  </label>
                  <textarea
                    id='notes'
                    name='notes'
                    className='w-full rounded-md bg-white p-2 text-main outline-none'
                  />
                </div>

                <div>
                  <p>{todayMessage}</p>
                </div>

                {/* Action Buttons */}
                <button
                  type='submit'
                  className='mt-4 w-full rounded-lg bg-white py-3 font-bold text-main shadow-light hover:bg-third hover:text-white hover:shadow-bold'
                >
                  Pesan
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
