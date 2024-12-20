import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { ImCancelCircle } from 'react-icons/im';

import useFetch from '@/hooks/useFetch';

import { CategoryWithItems, Item } from '@/types/api';

interface EditItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryId: number | null;
}

const EditItemModal = ({ isOpen, onClose, categoryId }: EditItemModalProps) => {
  const [categoryData, setCategoryData] =
    React.useState<CategoryWithItems | null>(null);
  const [selectedItem, setSelectedItem] = React.useState<Item | null>(null);

  const { data: category } = useFetch<CategoryWithItems>(
    `http://localhost:8080/api/category/${categoryId}/items`,
  );

  const { data: deleteResponse, executeRequest: deleteItem } = useFetch(
    `http://localhost:8080/api/item/${selectedItem?.id}`,
    'DELETE',
  );

  const { data: editResponse, executeRequest: editItem } = useFetch(
    `http://localhost:8080/api/item/${selectedItem?.id}`,
    'PATCH',
  );

  React.useEffect(() => {
    if (category) {
      setCategoryData(category);
    }
  }, [category]);

  React.useEffect(() => {
    if (category && category.items.length > 0) {
      setSelectedItem(category.items[0]);
    }
  }, [category]);

  React.useEffect(() => {
    if (deleteResponse || editResponse) {
      window.location.reload();
    }
  }, [deleteResponse, editResponse]);

  if (!isOpen || !category || !categoryData) return null;

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();

    const description = 'Apakah anda yakin ingin menghapus item ini?';

    if (confirm(description)) {
      await deleteItem();
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();

    const originalItem = categoryData.items.find(
      (i) => i.id === selectedItem?.id,
    );

    if (
      originalItem &&
      selectedItem &&
      originalItem.name !== selectedItem.name
    ) {
      const payload = { name: selectedItem.name };
      await editItem(payload);
    }
  };

  const handleItemSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedItemName = e.target.value;
    const item =
      category.items.find((i) => i.name === selectedItemName) || null;
    setSelectedItem(item);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedItem) {
      setSelectedItem({
        ...selectedItem,
        name: e.target.value,
      });
    }
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
          <p className='text-center font-lexend text-2xl font-bold'>
            {category.name}
          </p>

          <form>
            <label
              htmlFor='item-select'
              className='block font-lexend text-sm font-semibold text-main'
            >
              Select Item
            </label>
            <div className='flex items-center justify-between gap-x-4'>
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

              <button onClick={handleDelete}>
                <FaTrashAlt
                  size={32}
                  className='cursor-pointer text-main hover:text-secondary'
                />
              </button>
            </div>

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
              onChange={handleNameChange}
              className='mt-1 block w-full rounded-md border-2 border-third p-2 font-lexend shadow-sm outline-none focus:border-main sm:text-sm'
            />

            <div className='mt-6 flex justify-end'>
              <button
                className='rounded-lg bg-main px-4 py-2 font-lexend font-medium text-white shadow hover:bg-secondary'
                onClick={handleEdit}
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
