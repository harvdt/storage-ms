'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaFilter } from 'react-icons/fa6';
import { ImCancelCircle } from 'react-icons/im';

import SearchInput from '../../../../components/user/SearchInput';
import { cn } from '../../../../utils/lib/cn';
import { Item, Storage } from '../../../../utils/types/api';

export default function Inventory() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [items, setItems] = useState<Item[]>([]);
  const [_storages, setStorages] = useState<Storage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [itemsResponse, storagesResponse] = await Promise.all([
          fetch('http://localhost:8080/api/items'),
          fetch('http://localhost:8080/api/storages'),
        ]);

        if (!itemsResponse.ok || !storagesResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const itemsData: Item[] = await itemsResponse.json();
        const storagesData: Storage[] = await storagesResponse.json();

        setItems(itemsData);
        setStorages(storagesData);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target) {
      toggleModal();
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
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
