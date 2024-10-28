'use client';

import { useState } from 'react';
import { FaFilter } from 'react-icons/fa6';
import { FaWarehouse } from 'react-icons/fa6';
import { ImCancelCircle } from 'react-icons/im';

import ItemCard from '@/components/global/ItemCard';
import NoItemsFound from '@/components/global/NoItemsFound';
import SearchInput from '@/components/global/SearchInput';

import { cn } from '../../../../utils/lib/cn';

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
        <div className={cn('p-4')}>
          <div className={cn('flex w-full justify-between')}>
            <p className={cn('font-lexend text-2xl font-bold text-main')}>
              Pilih Gudang
            </p>

            <button onClick={onClose}>
              <ImCancelCircle
                className={cn(
                  'cursor-pointer text-3xl text-main hover:opacity-80',
                )}
              />
            </button>
          </div>

          <div className={cn('mt-4 h-[21rem] overflow-y-auto')}>
            {storages.map((storage, index) => (
              <div
                key={index}
                className={cn(
                  'my-2 h-28 w-full rounded-lg',
                  'flex items-center bg-gradient-to-b from-main to-secondary pl-8',
                  'transform cursor-pointer transition-all hover:scale-[0.98]',
                )}
              >
                <FaWarehouse size={48} className={cn('text-white')} />

                <div className={cn('mx-4')}>
                  <p className={cn('font-lexend text-xl font-bold text-white')}>
                    {storage.name}
                  </p>
                  <p className={cn('font-lexend text-white')}>
                    {storage.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const items: Item[] = [
  { id: 1, name: 'Pen', storageId: 1 },
  { id: 2, name: 'Notebook', storageId: 2 },
  { id: 3, name: 'Marker', storageId: 1 },
];

const storages: Storage[] = [
  { id: 1, name: 'Storage A', location: 'Location A' },
  { id: 2, name: 'Storage B', location: 'Location B' },
];

export default function Inventory() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <main>
      <div className={cn('flex w-[80rem] justify-between')}>
        <SearchInput
          placeholder='Cari Kategori'
          containerStyles='w-[76rem]'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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
          {filteredItems.length > 0 ? (
            <div className={cn('grid grid-cols-7 gap-5')}>
              {filteredItems.map((item) => {
                return (
                  <ItemCard
                    key={item.id}
                    name={item.name}
                    storage={
                      storages.find((storage) => storage.id === item.storageId)
                        ?.name || 'Unknown Storage'
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

      <FilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        storages={storages}
      />
    </main>
  );
}
