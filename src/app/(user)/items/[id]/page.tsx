'use client';

import Image from 'next/image';
import React, { FormEvent } from 'react';

import { cn } from '@/lib/utils';
import useFetch from '@/hooks/useFetch';

import { divisi } from './_data/Division';

import {
  CategoryWithItems,
  TransactionField,
  TransactionPayload,
} from '@/types/api';

export default function Page({ params }: { params: { id: string } }) {
  const [selectedItem, setSelectedItem] = React.useState<{
    id: number;
    name: string;
    quantity: number;
  } | null>(null);

  const [selectedRequest, setSelectedRequest] = React.useState('loaned');

  const [payload, setPayload] = React.useState<TransactionPayload | null>(null);
  const formRef = React.useRef<HTMLFormElement>(null);

  // Fetch categories with items using the ID from params
  const {
    data: category,
    loading: _categoryLoading,
    error: _categoryError,
  } = useFetch<CategoryWithItems>(
    `http://localhost:8080/api/category/${params.id}/items`,
  );

  const { data: response } = useFetch(
    selectedRequest === 'loaned'
      ? 'http://localhost:8080/api/transaction/loan'
      : 'http://localhost:8080/api/transaction/inquiry',
    'POST',
    payload,
  );

  console.log(category);

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

  const handleRequestChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRequest(event.target.value);
  };

  //   Form handling
  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries()) as TransactionField;
    const {
      employee_department,
      employee_name,
      employee_position,
      quantity,
      status,
      time,
    } = data;

    const payload: TransactionPayload = {
      item_id: Number(selectedItem?.id),
      quantity: Number(quantity),
      employee_department,
      employee_name,
      employee_position,
      status,
      time,
    };

    setPayload(payload);
  };

  return (
    <main className='container mx-auto'>
      <div className='relative w-full rounded-lg px-20 py-16 shadow-lg'>
        <div className='absolute inset-0 z-[-1] rounded-lg bg-white opacity-50' />

        {/* Main Content Grid */}
        <div className='grid grid-cols-1 gap-32 md:grid-cols-2'>
          {/* Left Column: Order Title & Image */}
          <div className='flex flex-col items-center'>
            <div className='mb-4 w-full rounded-lg bg-gradient-to-r from-main to-secondary py-3 text-center shadow-light'>
              <p className='font-lexend text-4xl font-bold text-white'>Order</p>
            </div>
            <Image
              src='/images/pulpen.png'
              height={500}
              width={500}
              className='rounded-lg object-contain'
              alt='Pulpen'
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
                <p>Rak: {category.items[0].shelf}</p>
              </div>
            </div>

            {/* Quantity Control */}
            <div className='space-y-4 rounded-lg bg-gradient-to-r from-main to-secondary p-6 font-lexend text-white'>
              <p className='text-3xl font-bold'>Form Pemesanan</p>

              <form
                ref={formRef}
                onSubmit={(e) => e.preventDefault()}
                className='space-y-4'
              >
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
                    onChange={handleRequestChange}
                  >
                    <option value='loaned'>Peminjaman</option>
                    <option value='inquired'>Permintaan</option>
                  </select>
                </div>

                {/* Return Time Input */}
                {selectedRequest === 'Peminjaman' && (
                  <div className='space-y-2'>
                    <label
                      htmlFor='returnTime'
                      className='block text-sm font-semibold'
                    >
                      Waktu Kembali
                    </label>
                    <input
                      id='time'
                      name='time'
                      type='datetime-local'
                      className='w-full rounded-md bg-white p-2 text-main outline-none'
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

                {/* <div className='space-y-2'>
                  <label
                    htmlFor='notes'
                    className='block text-sm font-semibold'
                  >
                    Notes
                  </label>
                  <textarea
                    id='notes'
                    className='w-full rounded-md bg-white p-2 text-main outline-none'
                  />
                </div> */}

                {/* Total Amount */}
                {/* <div className='space-y-2'>
                  <label className='block text-sm font-semibold'>Satuan</label>
                  <input
                    type='text'
                    readOnly
                    className='w-full rounded-md bg-white p-2 text-main outline-none'
                    value='{category.item.satuan}'
                  />
                </div> */}

                {/* Action Buttons */}
                <button
                  onClick={handleSubmit}
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
