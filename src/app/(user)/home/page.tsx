'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaWarehouse } from 'react-icons/fa';

import SearchInput from '../../../../components/user/SearchInput';
import { cn } from '../../../../utils/lib/cn';
import { Item, Storage } from '../../../../utils/types/api';

export default function Home() {
  const [itemSearch, setItemSearch] = useState('');
  const [storageSearch, setStorageSearch] = useState('');

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

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(itemSearch.toLowerCase()) ||
      storages
        .find((storage) => storage.id === item.storageId)
        ?.name.toLowerCase()
        .includes(itemSearch.toLowerCase()),
  );

  const filteredStorages = storages.filter((storage) =>
    storage.name.toLowerCase().includes(storageSearch.toLowerCase()),
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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

        <div
          className={cn('h-full overflow-auto p-4', 'grid grid-cols-7 gap-5')}
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
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

                <p className={cn('font-lexend text-sm')}>Gudang ATK</p>
              </div>
            ))
          ) : (
            <p className={cn('col-span-7 text-center')}>No items found</p>
          )}
        </div>
      </div>

      <div className={cn('mt-6 flex justify-between')}>
        <p className={cn('font-lexend text-3xl font-bold')}>TSO MANYAR</p>

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

        <div
          className={cn(
            'h-full overflow-auto p-4',
            'grid grid-cols-4 gap-x-8 gap-y-6',
          )}
        >
          {filteredStorages.length > 0 ? (
            filteredStorages.map((item, index) => (
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
                    {item.name}
                  </p>

                  <p className={cn('font-lexend')}>Gudang ATK</p>
                </div>
              </div>
            ))
          ) : (
            <p className={cn('col-span-4 text-center')}>No storages found</p>
          )}
        </div>
      </div>
    </main>
  );
}
