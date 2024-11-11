import React from 'react';
import { ImCancelCircle } from 'react-icons/im';

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddCategoryModal = ({ isOpen, onClose }: AddCategoryModalProps) => {
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
      </div>
    </div>
  );
};

export default AddCategoryModal;
