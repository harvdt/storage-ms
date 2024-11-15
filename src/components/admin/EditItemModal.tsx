import React, { useEffect,useState } from 'react';
import { ImCancelCircle } from 'react-icons/im';

import useFetch from '@/hooks/useFetch';

import { CategoryWithItems, Item } from '@/types/api';

interface EditItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryId: number | null;
}

const EditItemModal = ({ isOpen, onClose, categoryId }: EditItemModalProps) => {
  const [categoryData, setCategoryData] = useState<CategoryWithItems | null>(
    null,
  );
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const { data: category } = useFetch<CategoryWithItems>(
    `http://localhost:8080/api/category/${categoryId}/items`,
  );

  useEffect(() => {
    if (category) {
      setCategoryData(category);
    }
  }, [category]);

  useEffect(() => {
    if (category && category.items.length > 0) {
      setSelectedItem(category.items[0]);
    }
  }, [category]);

  if (!isOpen) return null;
  if (!category || !categoryData) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    if (selectedItem) {
      setSelectedItem({
        ...selectedItem,
        [name]: name === 'quantity' ? parseInt(value, 10) || 0 : value,
      });
    }
  };

  const handleItemSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedItemName = e.target.value;
    const item =
      category.items.find((i) => i.name === selectedItemName) || null;
    setSelectedItem(item);
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='w-full max-w-lg rounded-lg bg-white p-6'>
        <div className='flex items-center justify-between border-b pb-4'>
          <h3 className='font-lexend text-xl font-semibold'>Edit Item</h3>
          <button onClick={onClose} className='text-third hover:text-main'>
            <ImCancelCircle size={24} />
          </button>
        </div>

        <div className='mt-2 space-y-4'>
          <p className='text-center font-lexend text-xl font-bold'>
            {category.name}
          </p>

          <form>
            <label
              htmlFor='item-select'
              className='block font-lexend text-sm font-semibold text-main'
            >
              Select Item
            </label>
            <select
              id='item-select'
              value={selectedItem?.name || ''}
              onChange={handleItemSelect}
              className='mt-1 block w-full rounded-md border-2 border-third p-2 font-lexend shadow-sm outline-none focus:border-main sm:text-sm'
            >
              {category.items.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>

            <label
              htmlFor='name'
              className='mt-4 block font-lexend text-sm font-semibold text-main'
            >
              Nama Item
            </label>
            <input
              id='name'
              name='name'
              type='text'
              value={selectedItem?.name || ''}
              onChange={handleChange}
              className='mt-1 block w-full rounded-md border-2 border-third p-2 font-lexend shadow-sm outline-none focus:border-main sm:text-sm'
            />

            <label
              htmlFor='quantity'
              className='mt-4 block font-lexend text-sm font-semibold text-main'
            >
              Jumlah Item
            </label>
            <input
              id='quantity'
              name='quantity'
              type='number'
              value={selectedItem?.quantity || 0}
              onChange={handleChange}
              className='mt-1 block w-full rounded-md border-2 border-third p-2 font-lexend shadow-sm outline-none focus:border-main sm:text-sm'
            />

            <label
              htmlFor='shelf'
              className='mt-4 block font-lexend text-sm font-semibold text-main'
            >
              Rak Item
            </label>
            <input
              id='shelf'
              name='shelf'
              type='text'
              value={selectedItem?.shelf || ''}
              onChange={handleChange}
              className='mt-1 block w-full rounded-md border-2 border-third p-2 font-lexend shadow-sm outline-none focus:border-main sm:text-sm'
            />

            <div className='mt-6 flex justify-end'>
              <button
                type='submit'
                className='rounded-lg bg-main px-4 py-2 font-lexend font-medium text-white shadow hover:bg-secondary'
              >
                Edit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditItemModal;
