export type Item = {
  id: number;
  name: string;
  quantity: number;
  category_id: number;
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
  image: Uint8Array | string;
  employee_name: string;
  employee_department: string;
  employee_position: string;
  notes: string;
  quantity: number;
  status: string;
  time: string;
  item_request: Item;
  loan_time: string;
  return_time: string;
  completed_time: string;
  returned_time: string;
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
  item_name: string;
  image: File;
  shelf: string;
  category_id: number;
  quantity: number;
};

export type AddCategoryField = {
  name: string;
};

export type AddCategoryPayload = AddCategoryField & {
  image: File;
  storage_id: number;
};

export type EditItemField = {
  name: string;
  quantity: string;
  shelf: string;
};

export type EditItemPayload = {
  name: string;
  quantity: number;
  shelf: string;
};
