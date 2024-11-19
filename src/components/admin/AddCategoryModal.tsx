import React from 'react';
import { ImCancelCircle } from 'react-icons/im';

import useFetch from '@/hooks/useFetch';

import { Storage } from '@/types/api';

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  storageId: number;
}

const AddCategoryModal = ({
  isOpen,
  onClose,
  storageId,
}: AddCategoryModalProps) => {
  const { data: storage } = useFetch<Storage[]>(
    `http://localhost:8080/api/storage/${storageId}`,
  );

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='w-full max-w-lg rounded-lg bg-white p-6'>
        <div className='flex items-center justify-between border-b pb-4'>
          <h3 className='font-lexend text-xl font-semibold'>Tambah Category</h3>
          <button onClick={onClose} className='text-third hover:text-main'>
            <ImCancelCircle size={24} />
          </button>
        </div>

        <form>
          <div className='mt-4'>
            <label
              htmlFor='name'
              className='block font-lexend text-sm font-semibold text-main'
            >
              Nama Category
            </label>
            <input
              id='name'
              name='name'
              type='text'
              className='mt-1 block w-full rounded-md border-2 border-third p-2 font-lexend shadow-sm outline-none focus:border-main sm:text-sm'
            />
          </div>

          {/* Ini gausah dikirim, ini ku disabled */}
          <div className='mt-4'>
            <label
              htmlFor='storage'
              className='block font-lexend text-sm font-semibold text-main'
            >
              Gudang
            </label>
            <input
              id='storage'
              name='storage'
              type='text'
              value={storage?.name}
              disabled
              className='mt-1 block w-full cursor-not-allowed rounded-md border-2 border-third p-2 font-lexend shadow-sm outline-none focus:border-main sm:text-sm'
            />
          </div>

          <div className='mt-4'>
            <label
              htmlFor='image'
              className='block font-lexend text-sm font-semibold text-main'
            >
              Image
            </label>
            <button
              className='mt-1 block w-full rounded-md border-2 border-third py-2 font-lexend shadow-sm outline-none focus:border-main sm:text-sm'
              // onClick={() => fileInputRef.current?.click()}
            >
              {/* <span className='line-clamp-1 px-8'>
                {itemImage ? itemImage.name : 'Pilih File'}
              </span> */}
              <span className='line-clamp-1 px-8'>Pilih File</span>
            </button>
            <input
              id='image'
              type='file'
              accept='image/*'
              // ref={fileInputRef}
              // onChange={handleFileChange}
              className='hidden'
            />
          </div>

          <div className='mt-6 flex justify-end'>
            <button
              type='submit'
              className='rounded-lg bg-main px-4 py-2 font-lexend text-white shadow hover:bg-secondary'
            >
              Tambah
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
