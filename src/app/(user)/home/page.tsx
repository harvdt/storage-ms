'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaWarehouse } from 'react-icons/fa';

import ErrorState from '@/components/global/ErrorState';
import LoadingState from '@/components/global/LoadingState';
import NoItemsFound from '@/components/global/NoItemsFound';
import SearchInput from '@/components/global/SearchInput';

import { cn } from '@/utils/lib/cn';

export default function Home() {
  const [itemSearch, setItemSearch] = useState('');
  const [storageSearch, setStorageSearch] = useState('');
  const [storages, setStorages] = useState<Storage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:8080/api/storages');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const storagesData: Storage[] = await response.json();
        setStorages(storagesData);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredItems = storages.flatMap((storage) =>
    storage.categories.filter(
      (category: { name: string }) =>
        category.name.toLowerCase().includes(itemSearch.toLowerCase()) ||
        storage.name.toLowerCase().includes(itemSearch.toLowerCase()),
    ),
  );

  const filteredStorages = storages.filter((storage) =>
    storage.name.toLowerCase().includes(storageSearch.toLowerCase()),
  );

  return (
    <main>
      <SearchInput
        placeholder='Cari Barang'
        value={itemSearch}
        onChange={(e) => setItemSearch(e.target.value)}
      />

      <div
        className={cn(
          'relative mt-6 flex h-[23rem] w-[80rem] justify-center rounded-lg',
        )}
      >
        <div
          className={cn(
            'absolute inset-0 rounded-lg bg-white opacity-50',
            'z-[-1]',
          )}
        ></div>

        <div className={cn('h-full w-full overflow-auto p-4')}>
          {isLoading ? (
            <LoadingState containerClass='h-full' />
          ) : error ? (
            <ErrorState message={error} containerClass='h-full' />
          ) : (
            <div className={cn('grid grid-cols-7 gap-5')}>
              {filteredItems.length > 0 ? (
                filteredItems.map((category, index) => (
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
                      alt={category.name}
                    />
                    <p className={cn('font-lexend font-bold')}>
                      {category.name}
                    </p>
                    <p className={cn('font-lexend text-sm')}>
                      {
                        storages.find(
                          (storage) => storage.id === category.storageId,
                        )?.name
                      }
                    </p>
                  </div>
                ))
              ) : (
                <NoItemsFound
                  containerStyles='h-full w-full'
                  message='No Items Found'
                />
              )}
            </div>
          )}
        </div>
      </div>

      <div className={cn('mt-6 flex justify-between')}>
        <p className={cn('font-lexend text-3xl font-bold text-white')}>
          TSO MANYAR
        </p>
        <SearchInput
          placeholder='Cari Gudang'
          value={storageSearch}
          onChange={(e) => setStorageSearch(e.target.value)}
          containerStyles='w-[66rem]'
        />
      </div>

      <div
        className={cn(
          'relative mt-6 flex h-[12rem] w-[80rem] justify-center rounded-lg',
        )}
      >
        <div
          className={cn(
            'absolute inset-0 rounded-lg bg-white opacity-50',
            'z-[-1]',
          )}
        ></div>

        <div className={cn('h-full w-full overflow-auto p-4')}>
          {isLoading ? (
            <LoadingState containerClass='h-full' />
          ) : error ? (
            <ErrorState message={error} containerClass='h-full' />
          ) : (
            <div className={cn('grid grid-cols-4 gap-x-8 gap-y-6')}>
              {filteredStorages.length > 0 ? (
                filteredStorages.map((storage, index) => (
                  <div
                    key={index}
                    className={cn(
                      'h-32 w-72 rounded-lg',
                      'flex items-center justify-center bg-gradient-to-b from-main to-secondary',
                    )}
                  >
                    <FaWarehouse size={56} />
                    <div className={cn('mx-4')}>
                      <p className={cn('font-lexend text-xl font-bold')}>
                        {storage.name}
                      </p>
                      <p className={cn('font-lexend')}>{storage.location}</p>
                    </div>
                  </div>
                ))
              ) : (
                <NoItemsFound
                  containerStyles='h-full w-full'
                  message='No Storages Found'
                />
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
