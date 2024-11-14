import { serialize } from 'object-to-formdata';
import React, { FormEvent } from 'react';
import { ImCancelCircle } from 'react-icons/im';

import useFetch from '@/hooks/useFetch';

import { divisi } from '../../app/(user)/items/_data/Division';

import { AddItemField, AddItemPayload } from '@/types/api';

type Category = {
  id: number;
  name: string;
};

type Storage = {
  id: number;
  categories: Category[];
};

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  storage: Storage | null;
}

const AddItemModal = ({ isOpen, onClose, storage }: AddItemModalProps) => {
  const formRef = React.useRef<HTMLFormElement>(null);

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [itemImage, setItemImage] = React.useState<File | null>(null);

  const { data: storageCategories } = useFetch<Storage>(
    `http://localhost:8080/api/storage/${storage?.id}/no-image`,
  );

  const { data: response, executeRequest } = useFetch(
    'http://localhost:8080/api/transaction/insert',
    'POST',
  );

  // Reset & reload after send the data is success
  React.useEffect(() => {
    if (response) {
      formRef.current?.reset();
      window.location.reload();
    }
  }, [response]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setItemImage(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formRef.current || !itemImage) return;

    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries()) as AddItemField;

    const payload: AddItemPayload = {
      employee_name: data.employee_name,
      employee_department: data.employee_department,
      employee_position: data.employee_position,
      notes: data.notes,
      item_name: data.item_name,
      item_image: itemImage,
      shelf: data.item_shelf,
      category_id: Number(data.item_category_id),
      quantity: Number(data.item_quantity),
    };

    await executeRequest(serialize(payload), true);
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <form
        ref={formRef}
        className='w-full max-w-lg overflow-auto rounded-lg bg-white p-6'
        onSubmit={handleSubmit}
        style={{ maxHeight: '90vh' }}
      >
        <div className='flex items-center justify-between border-b pb-4'>
          <h3 className='font-lexend text-xl font-semibold'>Tambah Item</h3>
          <button onClick={onClose} className='text-third hover:text-main'>
            <ImCancelCircle size={24} />
          </button>
        </div>

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

        {/* Gambar Item */}
        <div className='mt-4'>
          <label
            htmlFor='item_image'
            className='block font-lexend text-sm font-semibold text-main'
          >
            Image
          </label>
          <button
            className='mt-1 block w-full rounded-md border-2 border-third py-2 font-lexend shadow-sm outline-none focus:border-main sm:text-sm'
            onClick={() => fileInputRef.current?.click()}
          >
            <span className='line-clamp-1 px-8'>
              {itemImage ? itemImage.name : 'Pilih File'}
            </span>
          </button>
          <input
            id='item.image'
            type='file'
            accept='image/*'
            ref={fileInputRef}
            onChange={handleFileChange}
            className='hidden'
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
            id='item_category_id'
            name='item_category_id'
            className='mt-1 block w-full rounded-md border-2 border-third p-2 font-lexend shadow-sm outline-none focus:border-main sm:text-sm'
          >
            {storageCategories?.categories?.map((category) => (
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

        {/* Button */}
        <div className='mt-6 flex justify-end'>
          <button
            type='submit'
            className='rounded-lg bg-main px-4 py-2 text-white shadow hover:bg-secondary'
          >
            Tambah
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItemModal;
