'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaFilter } from 'react-icons/fa6';
import { ImCancelCircle } from 'react-icons/im';

import ErrorState from '@/components/global/ErrorState';
import ItemCard from '@/components/global/ItemsCard';
import LoadingState from '@/components/global/LoadingState';
import SearchInput from '@/components/global/SearchInput';

import { cn } from '../../../../utils/lib/cn';
import { Item, Storage } from '../../../../utils/types/api';

const FilterModal = ({
  isOpen,
  onClose,
  storages,
}: {
  isOpen: boolean;
  onClose: () => void;
  storages: Storage[];
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-start justify-end bg-black/20 pr-6 pt-36',
        'transition-opacity duration-300',
        isOpen ? 'opacity-100' : 'opacity-0',
      )}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={cn(
          'h-[25rem] w-80 rounded-lg bg-white shadow-lg',
          'transform transition-transform duration-300',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className='p-4'>
          <button onClick={onClose} className='flex w-full justify-end'>
            <ImCancelCircle
              className={cn(
                'cursor-pointer text-3xl text-main hover:opacity-80',
              )}
            />
          </button>

          <div className={cn('mt-4 h-[21rem] overflow-y-auto pr-4')}>
            {storages.map((storage, index) => (
              <div
                key={index}
                className={cn(
                  'my-2 h-28 w-full rounded-lg',
                  'flex items-center bg-gradient-to-b from-main to-secondary pl-8',
                  'transform cursor-pointer transition-all hover:scale-[0.98]',
                )}
              >
                <Image
                  src='/images/pulpen.png'
                  width={40}
                  height={40}
                  alt={storage.name}
                  className='object-contain'
                />

                <div className={cn('mx-4')}>
                  <p className={cn('font-lexend text-xl font-bold')}>
                    {storage.name}
                  </p>
                  <p className={cn('font-lexend')}>{storage.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Inventory() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [storages, setStorages] = useState<Storage[]>([]);
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

  return (
    <main>
      <div className={cn('flex w-[80rem] justify-between')}>
        <SearchInput placeholder='Cari Kategori' containerStyles='w-[76rem]' />

        <button
          onClick={() => setIsModalOpen(true)}
          className='transform transition-all hover:scale-105'
        >
          <FaFilter
            size={42}
            className={cn('text-white opacity-50 hover:opacity-100')}
          />
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
        />

        <div className={cn('h-full w-full overflow-auto p-4')}>
          {isLoading ? (
            <LoadingState containerClass='h-full' />
          ) : error ? (
            <ErrorState message={error} containerClass='h-full' />
          ) : (
            <div className={cn('grid grid-cols-7 gap-5')}>
              {items.length > 0 ? (
                items.map((item, index) => <ItemCard key={index} item={item} />)
              ) : (
                <p
                  className={cn(
                    'col-span-7 text-center font-lexend text-gray-600',
                  )}
                >
                  No items found
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <FilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        storages={storages}
      />
    </main>
  );
}
