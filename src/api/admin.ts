import axios from "axios";

interface LoginFormData {
  email: string;
  password: string;
}

interface ResponseAdminLogin {
  name: string;
  email: string;
  token: string;
}

export interface Token {
  token: string;
  _id: string;
}

export interface ResponseOrder {
  orders: Order[];
}

export interface Order {
  owner: Owner;
  _id: string;
  address: string;
  notes: string;
  products: Product[];
  status: string;
  bill: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface OrderData {
  index: number;
  owner: Owner;
  _id: string;
  address: string;
  notes: string;
  products: Product[];
  status: string;
  bill: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Owner {
  ownerId: string;
  name: string;
  phone: string;
  email: string;
}

export interface Product {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  product_img: string;
  _id: string;
}

export const fetchLoginData = async ({
  email,
  password,
}: LoginFormData): Promise<ResponseAdminLogin> => {
  const data = await axios
    .post(`${import.meta.env.VITE_API_URL}/admin/login`, { email, password })
    .catch((err) => err);
  return data.data;
};

export const fetchAllOrders = async (token: string): Promise<ResponseOrder> => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const data = await axios
    .get(`${import.meta.env.VITE_API_URL}/order/all`, { headers })
    .catch((err) => err);
  return data.data;
};
