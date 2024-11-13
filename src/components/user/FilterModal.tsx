import Link from 'next/link';
import React from 'react';
import { FaWarehouse } from 'react-icons/fa';
import { ImCancelCircle } from 'react-icons/im';

import NoItemsFound from '@/components/global/NoItemsFound';

import { Storage } from '@/types/api';

interface FilterModalProps {
  isModalOpen: boolean;
  toggleModal: () => void;
  storages: Storage[];
  onOverlayClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  isModalOpen,
  toggleModal,
  storages,
  onOverlayClick,
}) => {
  if (!isModalOpen) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-start justify-end bg-black bg-opacity-20'
      onClick={onOverlayClick}
    >
      <div className='mt-32 aspect-[20/30] w-full max-w-sm overflow-hidden rounded-lg bg-white'>
        <div className='p-4'>
          <div className='flex items-center justify-between gap-x-4'>
            <p className='font-lexend text-2xl font-bold text-main'>
              Pilih Gudang
            </p>

            <button
              onClick={toggleModal}
              className='transition-opacity hover:opacity-80'
            >
              <ImCancelCircle
                size={30}
                className='text-third hover:text-main'
              />
            </button>
          </div>

          <div className='mt-4 h-[calc(100vh-12rem)] overflow-y-auto'>
            {storages.length > 0 ? (
              storages.map((storage, index) => (
                <Link key={index} href={`/items/storage/${storage.id}`}>
                  <div className='mb-4 flex transform items-center rounded-lg bg-gradient-to-b from-main to-secondary p-4 text-white transition-transform duration-300 hover:shadow-lg'>
                    <FaWarehouse className='h-8 w-8 flex-shrink-0 md:h-10 md:w-10' />
                    <div className='ml-4 min-w-0'>
                      <p className='truncate font-lexend text-lg font-bold md:text-xl'>
                        {storage.name}
                      </p>
                      <p className='truncate font-lexend'>{storage.location}</p>
                    </div>
                  </div>
                </Link>
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
  );
};

export default FilterModal;
