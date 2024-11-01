'use client';

import Link from 'next/link';
import React from 'react';
import { FaWarehouse } from 'react-icons/fa';
import { FaFilter } from 'react-icons/fa6';
import { ImCancelCircle } from 'react-icons/im';

import useFetch from '@/hooks/useFetch';

import CategoriesCard from '@/components/global/CategoriesCard';
import ErrorState from '@/components/global/ErrorState';
import LoadingState from '@/components/global/LoadingState';
import NoItemsFound from '@/components/global/NoItemsFound';
import SearchInput from '@/components/global/SearchInput';

import useDebounce from '@/utils/helper';

import { Category, Storage } from '@/types/api';

export default function Items() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [categoriesSearch, setCategoriesSearch] = React.useState('');
  const [categoriesResult, setCategoriesResult] = React.useState('');

  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetch<Category[]>('http://localhost:8080/api/categories');

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

  //! [ IF THE STORAGES DATA IS READY TO FETCH ]
  //! Don't forget to add the state (storagesLoading & storagesError) to the conditional below (use the || operator)

  // if (categoriesLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (categoriesError) {
  //   return <div>Error: Terjadi kesalahan</div>; //! Need the detailed error message from both fetch response
  // }

  //! [ IF THE STORAGES DATA IS READY TO FETCH ]
  //! Don't forget to add the storages to the conditional below (use the || operator) to handle when the value is null
  // if (!storages) {
  //   return <div>Data tidak ditemukan</div>;
  // }

  const filteredStorages = storages || [];

  const filteredCategories = Array.isArray(categories)
    ? categories.filter((category) =>
        category.name.toLowerCase().includes(categoriesResult.toLowerCase()),
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
      <div className='relative mt-6 aspect-[2/1] w-full rounded-lg'>
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
      {isModalOpen && (
        <div
          className='fixed inset-0 z-50 flex items-start justify-end bg-black bg-opacity-20'
          onClick={handleOverlayClick}
        >
          <div className='mr-10 mt-32 aspect-[20/30] w-full max-w-sm overflow-hidden rounded-lg bg-white'>
            <div className='p-4'>
              <div className='flex items-center justify-between gap-x-4'>
                <p className='font-lexend text-2xl font-bold text-main'>
                  Pilih Gudang
                </p>

                <button
                  onClick={toggleModal}
                  className='transition-opacity hover:opacity-80'
                >
                  <ImCancelCircle size={30} className='text-main' />
                </button>
              </div>

              <div className='mt-4 h-[calc(100vh-12rem)] overflow-y-auto'>
                {filteredStorages.length > 0 ? (
                  filteredStorages.map((storage, index) => (
                    <div
                      key={index}
                      className='mb-4 flex transform items-center rounded-lg bg-gradient-to-b from-main to-secondary p-4 text-white transition-transform duration-300 hover:shadow-lg'
                    >
                      <FaWarehouse className='h-8 w-8 flex-shrink-0 md:h-10 md:w-10' />
                      <div className='ml-4 min-w-0'>
                        <p className='truncate font-lexend text-lg font-bold md:text-xl'>
                          {storage.name}
                        </p>
                        <p className='truncate font-lexend'>
                          {storage.location}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <NoItemsFound
                    message='Gudang Tidak ditemukan'
                    containerStyles='text-main'
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
