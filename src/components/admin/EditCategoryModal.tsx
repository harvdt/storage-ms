import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { ImCancelCircle } from 'react-icons/im';

import useFetch from '@/hooks/useFetch';

import { Category } from '@/types/api';

interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryId: number | null;
}

const EditCategoryModal = ({
  isOpen,
  onClose,
  categoryId,
}: EditCategoryModalProps) => {
  const [categoryData, setCategoryData] = React.useState<Category | null>(null);

  const { data: category } = useFetch<Category>(
    `http://localhost:8080/api/category/${categoryId}`,
  );

  const { data: deleteResponse, executeRequest: deleteCategory } = useFetch(
    `http://localhost:8080/api/category/${categoryId}`,
    'DELETE',
  );

  const { data: editResponse, executeRequest: editCategory } = useFetch(
    `http://localhost:8080/api/category/${categoryId}`,
    'PATCH',
  );

  React.useEffect(() => {
    if (category) {
      setCategoryData(category);
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

    const description = 'Apakah anda yakin ingin menghapus category ini?';

    if (confirm(description)) {
      await deleteCategory();
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (categoryData.name !== category.name) {
      const payload = { name: categoryData.name };

      await editCategory(payload);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryData({ ...categoryData, name: e.target.value });
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='w-full max-w-lg rounded-lg bg-white p-6'>
        <div className='flex items-center justify-between border-b pb-4'>
          <p className='font-lexend text-xl font-semibold'>Edit Category</p>
          <button onClick={onClose} className='text-third hover:text-main'>
            <ImCancelCircle size={24} />
          </button>
        </div>

        <div className='mt-2 space-y-4'>
          <div className='flex items-center justify-between'>
            <p className='font-lexend text-2xl font-bold'>{category.name}</p>

            <button onClick={handleDelete}>
              <FaTrashAlt
                size={22}
                className='cursor-pointer text-main hover:text-secondary'
              />
            </button>
          </div>

          <form onSubmit={handleEdit}>
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
              value={categoryData.name}
              onChange={handleNameChange}
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

export default EditCategoryModal;
