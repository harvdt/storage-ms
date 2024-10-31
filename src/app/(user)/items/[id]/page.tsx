import Image from 'next/image';
import React from 'react';

export default function Page({ params }: { params: { id: string } }) {
  //nek misal gini berarti fetchnya localhost:8080/api/items/{params} gitu kah yum?

  return (
    <main className='container mx-auto'>
      <div className='relative w-full rounded-lg px-20 py-16 shadow-lg'>
        <div className='absolute inset-0 z-[-1] rounded-lg bg-white opacity-50' />

        {/* Header */}
        <div className='mb-6 text-2xl font-bold'>This is {params.id}</div>

        {/* Main Content Grid */}
        <div className='grid grid-cols-1 gap-32 md:grid-cols-2'>
          {/* Left Column: Order Title & Image */}
          <div className='flex flex-col items-center'>
            <div className='mb-4 w-full rounded-lg bg-gradient-to-r from-main to-secondary py-3 text-center'>
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
              <p className='text-2xl font-bold'>Pulpen</p>
              <p className='text-sm'>Stok: 190</p>

              {/* Color Options */}
              <div className='flex gap-2'>
                <button className='rounded-lg bg-white px-4 py-2'>
                  <p className='font-lexend text-sm font-bold text-main'>
                    Hitam
                  </p>
                </button>
                <button className='rounded-lg bg-white px-4 py-2'>
                  <p className='font-lexend text-sm font-bold text-main'>
                    Biru
                  </p>
                </button>
                <button className='rounded-lg bg-white px-4 py-2'>
                  <p className='font-lexend text-sm font-bold text-main'>
                    Merah
                  </p>
                </button>
              </div>

              {/* Location Info */}
              <div className='flex justify-between pr-48 text-sm'>
                <p>Gudang: ATK</p>
                <p>Rak: 1</p>
              </div>
            </div>

            {/* Quantity Control */}
            <div className='space-y-4 rounded-lg bg-gradient-to-r from-main to-secondary p-6 font-lexend text-white'>
              <p className='text-lg font-bold'>Atur Jumlah</p>

              {/* Quantity Input */}
              <div className='space-y-2'>
                <label className='block text-sm'>Jumlah</label>
                <input
                  type='number'
                  className='w-full rounded-md p-2 text-main'
                />
              </div>

              {/* Total Amount */}
              <div className='space-y-2'>
                <label className='block text-sm'>Satuan</label>
                <input
                  type='text'
                  readOnly
                  className='w-full rounded-md bg-white p-2 text-main'
                  value='{category.item.satuan}'
                />
              </div>

              {/* Action Buttons */}
              <div className='mt-4 flex gap-4'>
                <button className='flex-1 rounded-lg bg-white py-3 font-bold text-main'>
                  + Keranjang
                </button>
                <button className='flex-1 rounded-lg bg-white py-3 font-bold text-main'>
                  Pesan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
