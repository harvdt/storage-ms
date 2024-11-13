export type Item = {
  id: number;
  name: string;
  quantity: number;
  categoryId: number;
  shelf: string;
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
  image: Uint8Array | string;
};

export type CategoryWithItems = {
  id: number;
  name: string;
  storageId: number;
  storage: Storage;
  items: Item[];
  image: Uint8Array | string;
};

export type Transaction = {
  uuid: string;
  transaction_type: string;
  globalID: string;
  employee_name: string;
  employee_department: string;
  employee_position: string;
  notes: string;
  quantity: number;
  status: string;
  time: string;
  itemId: number;
  item: Item;
  loanTime: string;
  returnTime: string;
};

export type TransactionField = {
  employee_name: string;
  employee_department: string;
  employee_position: string;
  status: string;
  time: string;
  quantity: string;
  loan_time?: string;
  return_time?: string;
  notes: string;
};

export type TransactionPayload = {
  item_id: number;
  quantity: number;
  employee_name: string;
  employee_department: string;
  employee_position: string;
  status: string;
  time: string;
  loan_time?: string;
  return_time?: string;
  notes: string;
};

export type AddItemField = {
  employee_name: string;
  employee_department: string;
  employee_position: string;
  notes: string;
  item_name: string;
  item_shelf: string;
  item_category_id: string;
  item_quantity: string;
};

export type AddItemPayload = {
  employee_name: string;
  employee_department: string;
  employee_position: string;
  notes: string;
  item: {
    name: string;
    image: File;
    shelf: string;
    category_id: number;
    quantity: number;
  };
};
