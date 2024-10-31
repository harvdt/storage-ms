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
  storage: Storage;
};

export type CategoryWithItems = {
  id: number;
  name: string;
  storageId: number;
  storage: Storage;
  items: Item[];
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

export type TransactionField = {
  quantity: string;
  employee_name: string;
  employee_department: string;
  employee_position: string;
  status: string;
  time: string;
};

export type TransactionPayload = {
  item_id: number;
  quantity: number;
  employee_name: string;
  employee_department: string;
  employee_position: string;
  status: string;
  time: string;
};
