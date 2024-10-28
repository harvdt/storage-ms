'use client';

import { useState } from 'react';

import RequestCard from '@/components/admin/home/RequestCard';
import ItemCard from '@/components/global/ItemCard';
import NoItemsFound from '@/components/global/NoItemsFound';
import SearchInput from '@/components/global/SearchInput';
import StorageCard from '@/components/global/StorageCard';

import { cn } from '../../../../utils/lib/cn';

type Request = {
  name: string;
  jenis_request: string;
};

type Storage = {
  id: number;
  name: string;
  location: string;
};

type Item = {
  id: number;
  name: string;
  storageId: number;
};

const items: Item[] = [
  { id: 1, name: 'Pen', storageId: 1 },
  { id: 2, name: 'Notebook', storageId: 2 },
  { id: 3, name: 'Marker', storageId: 1 },
];

const storages: Storage[] = [
  {
    id: 1,
    name: 'Storage A',
    location: 'Location A',
  },
  {
    id: 2,
    name: 'Storage B',
    location: 'Location B',
  },
];

const requests: Request[] = [
  { name: 'Yoga Hartono', jenis_request: 'Peminjaman' },
  { name: 'Waluyo', jenis_request: 'Penambahan' },
  { name: 'Yoga Hartono', jenis_request: 'Pengambilan' },
];

export default function Home() {
  const [itemSearch, setItemSearch] = useState<string>('');
  const [storageSearch, setStorageSearch] = useState<string>('');

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(itemSearch.toLowerCase()),
  );

  const filteredStorages = storages.filter((storage) =>
    storage.name.toLowerCase().includes(storageSearch.toLowerCase()),
  );

  return (
    <main className={cn('flex w-[80rem] justify-between')}>
      <div>
        <SearchInput
          placeholder='Cari Barang'
          containerStyles='w-[58rem]'
          value={itemSearch}
          onChange={(e) => setItemSearch(e.target.value)}
        />

        <div
          className={cn(
            'relative mt-6 flex h-[23rem] w-[58rem] flex-col justify-center rounded-lg',
          )}
        >
          <div
            className={cn(
              'absolute inset-0 rounded-lg bg-white opacity-50',
              'z-[-1]',
            )}
          />
          <div className={cn('h-full w-full overflow-auto p-4')}>
            {filteredItems.length > 0 ? (
              <div className={cn('grid grid-cols-5 gap-5')}>
                {filteredItems.map((item) => {
                  return (
                    <ItemCard
                      key={item.id}
                      name={item.name}
                      storage={
                        storages.find(
                          (storage) => storage.id === item.storageId,
                        )?.name || 'Unknown Storage'
                      }
                    />
                  );
                })}
              </div>
            ) : (
              <NoItemsFound message='Tidak ada item yang ditemukan' />
            )}
          </div>
        </div>

        <div className={cn('mt-6 flex w-[58rem] justify-between')}>
          <p className={cn('font-lexend text-3xl font-bold text-white')}>
            TSO MANYAR
          </p>
          <SearchInput
            placeholder='Cari Gudang'
            value={storageSearch}
            onChange={(e) => setStorageSearch(e.target.value)}
            containerStyles='w-[43rem]'
          />
        </div>

        <div
          className={cn(
            'relative mt-6 flex h-[12rem] w-[58rem] flex-col justify-center rounded-lg',
          )}
        >
          <div
            className={cn(
              'absolute inset-0 z-[-1] rounded-lg bg-white opacity-50',
            )}
          ></div>
          <div className={cn('h-full w-full overflow-auto p-4')}>
            <div className={cn('grid grid-cols-3 gap-x-8 gap-y-6')}>
              {filteredStorages.length > 0 ? (
                filteredStorages.map((storage) => (
                  <StorageCard
                    key={storage.id}
                    name={storage.name}
                    location={storage.location}
                  />
                ))
              ) : (
                <NoItemsFound message='Tidak ada gudang yang ditemukan' />
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className={cn(
          'relative h-[44.5rem] w-[20rem] flex-col justify-center rounded-lg',
        )}
      >
        <div
          className={cn(
            'absolute inset-0 z-[-1] rounded-lg bg-white opacity-50',
          )}
        ></div>
        <div
          className={cn(
            'm-4 flex items-center justify-center rounded-lg border-2 border-main bg-white',
          )}
        >
          <p
            className={cn(
              'px-10 py-3 text-center font-lexend text-lg font-bold text-main',
            )}
          >
            Request Menunggu Approval
          </p>
        </div>

        <div className={cn('h-full w-full overflow-auto p-4')}>
          <div className={cn('grid grid-cols-1 gap-2')}>
            {requests.map((request, index) => (
              <RequestCard
                key={index}
                name={request.name}
                jenis_request={request.jenis_request}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
