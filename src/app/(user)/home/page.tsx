'use client';

import Link from 'next/link';
import React from 'react';

import useFetch from '@/hooks/useFetch';

import ErrorState from '@/components/global/ErrorState';
import LoadingState from '@/components/global/LoadingState';
import NoItemsFound from '@/components/global/NoItemsFound';
import SearchInput from '@/components/global/SearchInput';
import StoragesCard from '@/components/global/StoragesCard';

import { Storage } from '@/types/api';

export default function UserHomePage() {
  const [storageSearch, setStorageSearch] = React.useState('');

  const {
    data: storages,
    loading: storagesLoading,
    error: storagesError,
  } = useFetch<Storage[]>('http://localhost:8080/api/storages');

  // if (!storages) {
  //   return <div>Data tidak ditemukan!</div>;
  // }

  const filteredStorages = Array.isArray(storages)
    ? storages.filter((storage) =>
        storage.name.toLowerCase().includes(storageSearch.toLowerCase()),
      )
    : [];

  return (
    <main className='container mx-auto space-y-6'>
      {/* Header and Storage Search */}
      <div className='flex flex-col justify-between gap-4 lg:flex-row lg:items-center'>
        <p className='font-lexend text-2xl font-bold text-white md:text-3xl'>
          TSO MANYAR
        </p>
        <div className='lg:w-4/5'>
          <SearchInput
            placeholder='Cari Gudang'
            value={storageSearch}
            onChange={(e) => setStorageSearch(e.target.value)}
            containerStyles='w-full'
          />
        </div>
      </div>

      {/* Storage Section */}
      <div className='relative aspect-[10/3] w-full rounded-lg'>
        <div className='absolute inset-0 z-[-1] rounded-lg bg-white opacity-50' />

        <div className='h-full w-full overflow-auto p-4'>
          {storagesLoading ? (
            <LoadingState containerClass='h-full' />
          ) : storagesError ? (
            <ErrorState message='Terjadi Kesalahan' containerClass='h-full' />
          ) : (
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {filteredStorages.length > 0 ? (
                filteredStorages.map((storage, index) => (
                  <Link key={index} href={`/items/storage/${storage.id}`}>
                    <StoragesCard storage={storage} />
                  </Link>
                ))
              ) : (
                <NoItemsFound
                  containerStyles='col-span-full h-full w-full'
                  message='Gudang Tidak Ditemukan'
                />
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
