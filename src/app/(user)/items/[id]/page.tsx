'use client';

import Image from 'next/image';
import React from 'react';

import { cn } from '@/lib/utils';
import useFetch from '@/hooks/useFetch';

import { CategoryWithItems } from '@/types/api';

const divisi = [
  {
    name: 'A/P and A/R Management Division',
  },
  {
    name: 'Area Network Operations Jawa Bali Group',
  },
  {
    name: 'Asset Management Division',
  },
  {
    name: 'Consumer Business Area Jawa Bali Group',
  },
  {
    name: 'Consumer Business Growth and Analytics Area Jawa Bali Division',
  },
  {
    name: 'Consumer Business Region Bali Nusra Division',
  },
  {
    name: 'Consumer Business Region Jawa Tengah and DIY Division',
  },
  {
    name: 'Consumer Business Region Jawa Timur Division',
  },
  {
    name: 'Corporate Communications Division',
  },
  {
    name: 'Customer Care and Retention Area Jawa Bali Division',
  },
  {
    name: 'Customer Care Interaction Management Division',
  },
  {
    name: 'Enterprise Account Management East Area Division',
  },
  {
    name: 'Enterprise Customer Solutions Management Division',
  },
  {
    name: 'Enterprise Delivery and Project Administration Division',
  },
  {
    name: 'Enterprise Service and Experience Management Division',
  },
  {
    name: 'Finance Business Partner East Area Division',
  },
  {
    name: 'Fixed Network Operations Division',
  },
  {
    name: 'General Service East Area Division',
  },
  {
    name: 'Household Segment GTM Area Jawa Bali Division',
  },
  {
    name: 'Integrated Procurement Area Division',
  },
  {
    name: 'IT Operation Area Division',
  },
  {
    name: 'Legal Business Partner and Compliance Area Division',
  },
  {
    name: 'Mobile Segment GTM Area Jawa Bali Division',
  },
  {
    name: 'Network Deployment Support Jawa Bali Division',
  },
  {
    name: 'Network Engineering Support and Consolidation Jawa Bali Division',
  },
  {
    name: 'Network Quality Digitalization Division',
  },
  {
    name: 'Operational Facility Management Division',
  },
  {
    name: 'People Business Partner - Account Team',
  },
  {
    name: 'Prepaid Consumer Area Jawa Bali Division',
  },
  {
    name: 'Region Network Operations and Productivity Bali Nusra Division',
  },
  {
    name: 'Region Network Operations and Productivity Jawa Tengah and DIY Division',
  },
  {
    name: 'Region Network Operations and Productivity Jawa Timur Division',
  },
  {
    name: 'SME Tele and Digital Channel Management Division',
  },
  {
    name: 'Tax Management Division',
  },
  {
    name: 'Territory and Household Partnership Area Jawa Bali Division',
  },
  {
    name: 'Treasury Management Division',
  },
];

export default function Page({ params }: { params: { id: string } }) {
  const [selectedItem, setSelectedItem] = React.useState<{
    name: string;
    quantity: number;
  } | null>(null);

  // Fetch categories with items using the ID from params
  const {
    data: category,
    loading: _categoryLoading,
    error: _categoryError,
  } = useFetch<CategoryWithItems>(
    `http://localhost:8080/api/category/${params.id}/items`,
  );

  if (!category) {
    return <div>Tidak ada kategori</div>;
  }

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
                <p>Gudang: belom</p>
                <p>Rak: belom</p>
              </div>
            </div>

            {/* Quantity Control */}
            <div className='space-y-4 rounded-lg bg-gradient-to-r from-main to-secondary p-6 font-lexend text-white'>
              <p className='text-3xl font-bold'>Form Pemesanan</p>

              <form className='space-y-4'>
                <div className='space-y-2'>
                  <label htmlFor='nama' className='block text-sm font-semibold'>
                    Nama
                  </label>
                  <input
                    type='text'
                    id='nama'
                    className='w-full rounded-md bg-white p-2 text-main outline-none'
                  />
                </div>

                <div className='space-y-2'>
                  <label
                    htmlFor='divisi'
                    className='block text-sm font-semibold'
                  >
                    Divisi
                  </label>
                  <select
                    id='divisi'
                    className='w-full rounded-md bg-white p-2 text-main outline-none'
                  >
                    {divisi.map((divisi, index) => (
                      <option key={index}>{divisi.name}</option>
                    ))}
                  </select>
                </div>

                <div className='space-y-2'>
                  <label
                    htmlFor='jabatan'
                    className='block text-sm font-semibold'
                  >
                    Jabatan
                  </label>
                  <input
                    type='text'
                    id='jabatan'
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
                    className='w-full rounded-md bg-white p-2 text-main outline-none'
                  />
                </div>

                <div className='space-y-2'>
                  <label className='block text-sm font-semibold'>Jumlah</label>
                  <input
                    type='number'
                    placeholder='1'
                    className='w-full rounded-md bg-white p-2 text-main outline-none'
                  />
                </div>

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
                <button className='mt-4 w-full rounded-lg bg-white py-3 font-bold text-main shadow-light hover:bg-third hover:text-white hover:shadow-bold'>
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
