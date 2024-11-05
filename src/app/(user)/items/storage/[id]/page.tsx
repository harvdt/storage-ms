'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaFilter } from 'react-icons/fa6';

import useFetch from '@/hooks/useFetch';

import AddItemModal from '@/components/global/AddItemModal';
import ErrorState from '@/components/global/ErrorState';
import FilterModal from '@/components/global/FilterModal';
import NoItemsFound from '@/components/global/NoItemsFound';
import SearchInput from '@/components/global/SearchInput';

import { Storage } from '@/types/api';

export default function UserStoragePage({
  params,
}: {
  params: { id: string };
}) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = React.useState(false);
  const [categoriesSearch, setCategoriesSearch] = React.useState('');

  const {
    data: storages,
    loading: _storagesLoading, // used if needed
    error: _storagesError, // used if needed
  } = useFetch<Storage[]>('http://localhost:8080/api/storages');

  const {
    data: storage,
    loading: _storageLoading, // used if needed
    error: _storageError, // used if needed
  } = useFetch<Storage>(`http://localhost:8080/api/storage/${params.id}`);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleAddItemModal = () => {
    setIsAddItemModalOpen(!isAddItemModalOpen);
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target) {
      toggleModal();
    }
  };

  const addItemButtonShown = () => {
    if (storage && storage.name === 'ATK') {
      return false;
    }
    return true;
  };

  if (!storage) {
    return (
      <div className='container mx-auto flex h-screen w-screen items-center justify-center'>
        <ErrorState message='Storage Tidak Ditemukan' />
      </div>
    );
  }

  const filteredCategories = storage.categories
    ? storage.categories.filter((category) =>
        category.name.toLowerCase().includes(categoriesSearch.toLowerCase()),
      )
    : [];

  return (
    <main className='container mx-auto'>
      {/* Header with Search and Filter */}
      <div className='flex items-center gap-4'>
        <SearchInput
          placeholder='Cari Kategori'
          value={categoriesSearch}
          onChange={(e) => setCategoriesSearch(e.target.value)}
          containerStyles='flex-grow'
        />
        <button
          onClick={toggleModal}
          className='flex-shrink-0 transition-opacity duration-200'
        >
          <FaFilter className='h-8 w-8 opacity-50 hover:text-white hover:opacity-100 md:h-10 md:w-10' />
        </button>
      </div>

      {/* Main Content Area */}
      <div className='relative mb-6 mt-6 aspect-[2/1] w-full rounded-lg'>
        <div className='absolute inset-0 z-[-1] rounded-lg bg-white opacity-50' />

        <div className='flex w-full items-center justify-between px-4 pb-2 pt-6'>
          <p className='font-lexend text-3xl font-bold text-white'>
            Gudang {storage.name}
          </p>

          {addItemButtonShown() && (
            <button
              onClick={toggleAddItemModal}
              className='rounded-lg bg-main px-4 py-2 font-lexend font-semibold text-white shadow-light hover:bg-third hover:shadow-bold'
            >
              Add Item
            </button>
          )}
        </div>

        <div className='h-full w-full overflow-auto p-4'>
          {filteredCategories.length > 0 ? (
            <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7'>
              {filteredCategories.map((category, index) => (
                <Link href={`/items/${category.id}`} key={index}>
                  <div className='flex aspect-square transform flex-col items-center justify-center rounded-lg bg-gradient-to-b from-main to-secondary p-4 text-white transition-transform duration-300 hover:scale-105 hover:shadow-lg'>
                    <div className='relative aspect-square w-3/5'>
                      <Image
                        src='/images/pulpen.png'
                        fill
                        className='object-contain'
                        alt={category.name}
                      />
                    </div>
                    <p className='mt-2 line-clamp-1 text-center font-lexend font-bold'>
                      {category.name}
                    </p>
                    <p className='line-clamp-1 text-center font-lexend text-sm'>
                      {storage.name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <NoItemsFound
              containerStyles='col-span-full h-full w-full'
              message='Kategori Tidak Ditemukan'
            />
          )}
        </div>
      </div>

      {/* Add Item Modal */}
      <AddItemModal
        isOpen={isAddItemModalOpen}
        onClose={toggleAddItemModal}
        storage={storage}
      />

      {/* Filter Modal */}
      <FilterModal
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        storages={storages || []}
        onOverlayClick={handleOverlayClick}
      />
    </main>
  );
}
