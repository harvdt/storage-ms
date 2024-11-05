import React, { FormEvent } from 'react';
import { ImCancelCircle } from 'react-icons/im';

import useFetch from '@/hooks/useFetch';

import { divisi } from '../../app/(user)/items/_data/Division';

import { AddItemPayload } from '@/types/api';

type Category = {
  id: number;
  name: string;
};

type Storage = {
  categories: Category[];
};

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  storage: Storage | null;
}

const AddItemModal = ({ isOpen, onClose, storage }: AddItemModalProps) => {
  const [payload, setPayload] = React.useState<AddItemPayload | null>(null);
  const formRef = React.useRef<HTMLFormElement>(null);

  const { data: response } = useFetch(
    'http://localhost:8080/api/transaction/insert',
    'POST',
    payload,
  );

  React.useEffect(() => {
    if (response) {
      formRef.current?.reset();
      window.location.reload();
    }
  }, [response]);

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    const addItemPayload: AddItemPayload = {
      employee_name: formData.get('employee_name') as string,
      employee_department: formData.get('employee_department') as string,
      employee_position: formData.get('employee_position') as string,
      quantity: Number(formData.get('item_quantity')),
      notes: formData.get('notes') as string,
      item: {
        name: formData.get('item_name') as string,
        shelf: formData.get('item_shelf') as string,
        category_id: Number(formData.get('item_category')),
        quantity: Number(formData.get('item_quantity')),
      },
    };

    setPayload(addItemPayload);
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='w-full max-w-lg rounded-lg bg-white p-6'>
        <div className='flex items-center justify-between border-b pb-4'>
          <h3 className='font-lexend text-xl font-semibold'>Tambah Item</h3>
          <button onClick={onClose} className='text-third hover:text-main'>
            <ImCancelCircle size={24} />
          </button>
        </div>

        <form ref={formRef} onSubmit={(e) => e.preventDefault()}>
          {/* Nama Item */}
          <div className='mt-4'>
            <label
              htmlFor='employee_name'
              className='block font-lexend text-sm font-semibold text-main'
            >
              Nama
            </label>
            <input
              id='employee_name'
              name='employee_name'
              type='text'
              className='mt-1 block w-full rounded-md border-2 border-third p-2 font-lexend shadow-sm outline-none focus:border-main sm:text-sm'
            />
          </div>

          {/* Divisi */}
          <div className='mt-4'>
            <label
              htmlFor='employee_department'
              className='block font-lexend text-sm font-semibold text-main'
            >
              Divisi
            </label>
            <select
              id='employee_department'
              name='employee_department'
              className='mt-1 block w-full rounded-md border-2 border-third p-2 font-lexend shadow-sm outline-none focus:border-main sm:text-sm'
            >
              {divisi.map((division, index) => (
                <option key={index} value={division.name}>
                  {division.name}
                </option>
              ))}
            </select>
          </div>

          {/* Jabatan */}
          <div className='mt-4'>
            <label
              htmlFor='employee_position'
              className='block font-lexend text-sm font-semibold text-main'
            >
              Jabatan
            </label>
            <input
              id='employee_position'
              name='employee_position'
              type='text'
              className='mt-1 block w-full rounded-md border-2 border-third p-2 font-lexend shadow-sm outline-none focus:border-main sm:text-sm'
            />
          </div>

          {/* Nama Item */}
          <div className='mt-4'>
            <label
              htmlFor='item_name'
              className='block font-lexend text-sm font-semibold text-main'
            >
              Nama Item
            </label>
            <input
              id='item_name'
              name='item_name'
              type='text'
              className='mt-1 block w-full rounded-md border-2 border-third p-2 font-lexend shadow-sm outline-none focus:border-main sm:text-sm'
            />
          </div>

          {/* Kategori Item */}
          <div className='mt-4'>
            <label
              htmlFor='item_category'
              className='block font-lexend text-sm font-semibold text-main'
            >
              Kategori Item
            </label>
            <select
              id='item_category'
              name='item_category'
              className='mt-1 block w-full rounded-md border-2 border-third p-2 font-lexend shadow-sm outline-none focus:border-main sm:text-sm'
            >
              {storage?.categories?.map((category: Category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Rak Item */}
          <div className='mt-4'>
            <label
              htmlFor='item_shelf'
              className='block font-lexend text-sm font-semibold text-main'
            >
              Rak Item
            </label>
            <input
              id='item_shelf'
              name='item_shelf'
              type='text'
              className='mt-1 block w-full rounded-md border-2 border-third p-2 font-lexend shadow-sm outline-none focus:border-main sm:text-sm'
            />
          </div>

          {/* Kuantitas */}
          <div className='mt-4'>
            <label
              htmlFor='item_quantity'
              className='block font-lexend text-sm font-semibold text-main'
            >
              Kuantitas
            </label>
            <input
              id='item_quantity'
              name='item_quantity'
              type='number'
              className='mt-1 block w-full rounded-md border-2 border-third p-2 font-lexend shadow-sm outline-none focus:border-main sm:text-sm'
            />
          </div>

          {/* Notes */}
          <div className='mt-4'>
            <label
              htmlFor='notes'
              className='block font-lexend text-sm font-semibold text-main'
            >
              Notes
            </label>
            <textarea
              id='notes'
              name='notes'
              className='mt-1 block w-full rounded-md border-2 border-third p-2 font-lexend shadow-sm outline-none focus:border-main sm:text-sm'
            />
          </div>
        </form>

        {/* Button */}
        <div className='mt-6 flex justify-end'>
          <button
            onClick={handleSubmit}
            className='rounded-lg bg-main px-4 py-2 text-white shadow hover:bg-secondary'
          >
            Tambah
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddItemModal;
