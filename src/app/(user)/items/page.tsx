'use client';

import Link from 'next/link';
import React from 'react';
import { FaFilter } from 'react-icons/fa6';

import useFetch from '@/hooks/useFetch';

import CategoriesCard from '@/components/global/CategoriesCard';
import ErrorState from '@/components/global/ErrorState';
import LoadingState from '@/components/global/LoadingState';
import NoItemsFound from '@/components/global/NoItemsFound';
import SearchInput from '@/components/global/SearchInput';
import FilterModal from '@/components/user/FilterModal';

import useDebounce from '@/utils/helper';

import { Category, Storage } from '@/types/api';

export default function UserItemsPage() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [categoriesSearch, setCategoriesSearch] = React.useState('');
  const [categoriesResult, setCategoriesResult] = React.useState('');

  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetch<Category[]>(
    'http://localhost:8080/api/categories?page=1&limit=100',
  );

  const {
    data: storages,
    loading: _storagesLoading, //used if needed
    error: _storagesError, //used if needed
  } = useFetch<Storage[]>('http://localhost:8080/api/storages');

  const debounce = useDebounce(categoriesSearch);

  React.useEffect(() => {
    setCategoriesResult(debounce);
  }, [debounce]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target) {
      toggleModal();
    }
  };

  const filteredCategories = Array.isArray(categories)
    ? categories.filter((category) =>
        category.name.toLowerCase().includes(categoriesResult.toLowerCase()),
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
          onClick={toggleModal}
          className='flex-shrink-0 transition-opacity duration-200'
        >
          <FaFilter className='h-8 w-8 opacity-50 hover:text-white hover:opacity-100 md:h-10 md:w-10' />
        </button>
      </div>

      {/* Main Content Area */}
      <div className='relative mt-6 max-h-screen w-full rounded-lg'>
        <div className='absolute inset-0 z-[-1] rounded-lg bg-white opacity-50' />

        <div className='h-full w-full overflow-auto p-4'>
          {categoriesLoading ? (
            <LoadingState containerClass='h-full' />
          ) : categoriesError ? (
            <ErrorState message='Terjadi Kesalahan' containerClass='h-full' />
          ) : (
            <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7'>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category, index) => (
                  <Link href={`/items/${category.id}`} key={index}>
                    <CategoriesCard key={index} category={category} />
                  </Link>
                ))
              ) : (
                <NoItemsFound
                  containerStyles='col-span-full h-full w-full'
                  message='Kategori Tidak Ditemukan'
                />
              )}
            </div>
          )}
        </div>
      </div>

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
