export type Item = {
  id: number;
  name: string;
  quantity: number;
  categoryId: number;
};

export type Storage = {
  id: number;
  name: string;
  location: string;
  categories: Category[];
};

export type Error = {
  message: string;
};

export type Category = {
  id: number;
  name: string;
  storageId: number;
};

export type Transaction = {
  id: number;
  employeeName: string;
  employeeDepartment: string;
  employeePosition: string;
  quantity: number;
  status: string;
  itemId: number;
};
