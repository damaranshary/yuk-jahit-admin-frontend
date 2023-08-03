import axios from "axios";

export interface ResponseOrder {
  orders: Order[];
}

export interface ResponseOrderById {
  order: Order;
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
  getOrderData: () => Promise<void>;
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

export const fetchAllOrders = async (token: string): Promise<ResponseOrder> => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const data = await axios
    .get(`${import.meta.env.VITE_API_URL}/order/all`, { headers })
    .catch((err) => err);
  return data.data;
};

export const deleteOrder = async (
  //api call for deleting product from cart
  token: string,
  orderId: string
): Promise<ResponseOrderById | null> => {
  const header = {
    Authorization: `Bearer ${token}`,
  };
  const data = await axios
    .delete(`${import.meta.env.VITE_API_URL}/order/delete/${orderId}`, {
      headers: header,
    })
    .catch((err) => err);

  return data.data;
};
