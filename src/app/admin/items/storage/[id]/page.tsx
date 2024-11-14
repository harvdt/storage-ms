'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { CiEdit } from 'react-icons/ci';
import { FaFilter } from 'react-icons/fa6';

import useFetch from '@/hooks/useFetch';

import EditCategoryModal from '@/components/admin/EditCategoryModal';
import FilterModalAdmin from '@/components/admin/FilterModalAdmin';
import AddCategoryModal from '@/components/global/AddCategoryModal';
import AddItemModal from '@/components/global/AddItemModal';
import ErrorState from '@/components/global/ErrorState';
import NoItemsFound from '@/components/global/NoItemsFound';
import SearchInput from '@/components/global/SearchInput';

import { Storage } from '@/types/api';

export default function AdminStoragePage({
  params,
}: {
  params: { id: string };
}) {
  const [isFilterModalOpen, setIsFilterModalOpen] = React.useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] =
    React.useState(false);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = React.useState(false);
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] =
    React.useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<
    number | null
  >(null);
  const [categoriesSearch, setCategoriesSearch] = React.useState('');

  const { data: storages } = useFetch<Storage[]>(
    'http://localhost:8080/api/storages',
  );

  const { data: storage } = useFetch<Storage>(
    `http://localhost:8080/api/storage/${params.id}`,
  );

  const toggleFilterModal = () => {
    setIsFilterModalOpen(!isFilterModalOpen);
  };

  const toggleAddCategoryModal = () => {
    setIsAddCategoryModalOpen(!isAddCategoryModalOpen);
  };

  const toggleAddItemModal = () => {
    setIsAddItemModalOpen(!isAddItemModalOpen);
  };

  const toggleEditCategoryModal = (categoryId?: number) => {
    setSelectedCategoryId(categoryId || null);
    setIsEditCategoryModalOpen(!isEditCategoryModalOpen);
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target) {
      toggleFilterModal();
    }
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
    <main className='mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl'>
      {/* Header with Search and Filter */}
      <div className='flex items-center gap-4'>
        <SearchInput
          placeholder='Cari Kategori'
          value={categoriesSearch}
          onChange={(e) => setCategoriesSearch(e.target.value)}
          containerStyles='flex-grow'
        />
        <button
          onClick={toggleFilterModal}
          className='flex-shrink-0 transition-opacity duration-200'
        >
          <FaFilter className='h-8 w-8 opacity-50 hover:text-white hover:opacity-100 md:h-10 md:w-10' />
        </button>
      </div>

      {/* Main Content Area */}
      <div className='relative mb-6 mt-6 w-full rounded-lg'>
        <div className='absolute inset-0 z-[-1] rounded-lg bg-white opacity-50' />

        <div className='flex w-full items-center justify-between px-4 pb-2 pt-6'>
          <div className='rounded-lg bg-gradient-to-r from-main to-secondary px-6 py-2 shadow-light'>
            <p className='font-lexend text-3xl font-bold text-white'>
              Gudang {storage.name}
            </p>
          </div>

          <div className='space-x-4'>
            <button
              onClick={toggleAddCategoryModal}
              className='rounded-lg bg-main px-4 py-2 font-lexend font-semibold text-white shadow-light hover:bg-third hover:shadow-bold'
            >
              Add Category
            </button>

            <button
              onClick={toggleAddItemModal}
              className='rounded-lg bg-main px-4 py-2 font-lexend font-semibold text-white shadow-light hover:bg-third hover:shadow-bold'
            >
              Add Item
            </button>
          </div>
        </div>

        <div className='h-full w-full overflow-auto p-4'>
          {filteredCategories.length > 0 ? (
            <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7'>
              {filteredCategories.map((category, index) => (
                <div key={index} className='relative'>
                  {' '}
                  <Link href={`/admin/items/${category.id}`} passHref>
                    <div className='relative flex aspect-square flex-col items-center justify-center rounded-lg bg-gradient-to-b from-main to-secondary p-4 text-white transition-transform duration-300 hover:scale-105 hover:shadow-lg'>
                      <div className='relative aspect-square w-3/5'>
                        <Image
                          src={`data:image/jpeg;base64,${category.image}`}
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
                  <button
                    className='absolute -bottom-2 -right-2 z-10 rounded-full bg-white p-2 transition-transform duration-300 hover:scale-110 hover:shadow-lg'
                    onClick={() => toggleEditCategoryModal(category.id)}
                  >
                    <CiEdit size={18} className='text-main' />
                  </button>
                </div>
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

      {/* Add Category Modal */}
      <AddCategoryModal
        isOpen={isAddCategoryModalOpen}
        onClose={toggleAddCategoryModal}
      />

      {/* Add Item Modal */}
      <AddItemModal
        isOpen={isAddItemModalOpen}
        onClose={toggleAddItemModal}
        storage={storage}
      />

      {/* Edit Category Modal */}
      <EditCategoryModal
        isOpen={isEditCategoryModalOpen}
        onClose={() => toggleEditCategoryModal()}
        categoryId={selectedCategoryId}
      />

      {/* Filter Modal */}
      <FilterModalAdmin
        isModalOpen={isFilterModalOpen}
        toggleModal={toggleFilterModal}
        storages={storages || []}
        onOverlayClick={handleOverlayClick}
      />
    </main>
  );
}
