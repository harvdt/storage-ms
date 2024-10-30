'use client';

import Image from 'next/image';
import React from 'react';
import { FaFilter } from 'react-icons/fa6';
import { ImCancelCircle } from 'react-icons/im';

import { cn } from '@/lib/utils';
import useFetch from '@/hooks/useFetch';

import SearchInput from '@/components/global/SearchInput';

import { Item } from '@/types/api';

export default function Inventory() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const {
    data: items,
    loading: itemsLoading,
    error: itemsError,
  } = useFetch<Item[]>('http://localhost:8080/api/items');

  //! [ IF THE STORAGES DATA IS READY TO FETCH ]
  //! Uncomment the line below
  /*
  const {
    data: storages,
    loading: storagesLoading,
    error: storagesError,
  } = useFetch('http://localhost:8080/api/storages');
   */

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target) {
      toggleModal();
    }
  };

  //! [ IF THE STORAGES DATA IS READY TO FETCH ]
  //! Don't forget to add the state (storagesLoading & storagesError) to the conditional below (use the || operator)

  if (itemsLoading) {
    return <div>Loading...</div>;
  }

  if (itemsError) {
    return <div>Error: Terjadi kesalahan</div>; //! Need the detailed error message from both fetch response
  }

  //! [ IF THE STORAGES DATA IS READY TO FETCH ]
  //! Don't forget to add the storages to the conditional below (use the || operator) to handle when the value is null
  if (!items) {
    return <div>Data tidak ditemukan</div>;
  }

  return (
    <main>
      <div className={cn('flex w-[80rem] justify-between')}>
        <SearchInput placeholder='Cari Kategori' containerStyles='w-[76rem]' />

        <button onClick={toggleModal}>
          <FaFilter size={42} className={cn('opacity-50 hover:opacity-100')} />
        </button>
      </div>

      <div
        className={cn(
          'relative mt-6 flex h-[40rem] w-[80rem] flex-col justify-center rounded-lg',
        )}
      >
        <div
          className={cn(
            'absolute inset-0 rounded-lg bg-white opacity-50',
            'z-[-1]',
          )}
        ></div>

        <div
          className={cn('h-full overflow-auto p-4', 'grid grid-cols-7 gap-5')}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className={cn(
                'h-40 w-40 rounded-lg',
                'flex flex-col items-center justify-center bg-gradient-to-b from-main to-secondary',
              )}
            >
              <Image
                src='/images/pulpen.png'
                width={100}
                height={100}
                alt={item.name}
              />

              <p className={cn('font-lexend font-bold')}>{item.name}</p>

              <p className={cn('font-lexend text-sm')}>{item.quantity}</p>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div
          className={cn(
            'fixed inset-0 z-50 flex justify-end bg-black bg-opacity-20 pr-6 pt-36',
          )}
          onClick={handleOverlayClick}
        >
          <div className={cn('h-[25rem] w-80 rounded-lg bg-white pl-4 pt-4')}>
            <button onClick={toggleModal}>
              <ImCancelCircle
                className={cn('cursor-pointer text-3xl text-main')}
              />
            </button>

            <div className={cn('h-[21rem] overflow-y-auto')}>
              {/*storages.map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    'my-2 h-28 w-[18rem] rounded-lg',
                    'flex items-center bg-gradient-to-b from-main to-secondary pl-8',
                  )}
                >
                  <FaWarehouse size={40} />

                  <div className={cn('mx-4')}>
                    <p className={cn('font-lexend text-xl font-bold')}>
                      {item.name}
                    </p>

                    <p className={cn('font-lexend')}>{item.location}</p>
                  </div>
                </div>
              ))*/}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
