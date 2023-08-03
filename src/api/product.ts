import axios from "axios";

export interface AddProductData {
  name: string;
  price: number;
  description: string;
  category: string;
}

export interface EditProductData {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
}

export interface ResponseProducts {
  data: ResponseProduct[];
}

export interface ResponseProductById {
  data: ResponseProduct;
}

export interface ProductCard {
  product: ResponseProduct;
  index: number;
}

export interface ResponseProduct {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  product_img: string;
  cloudinary_id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const addProduct = async (
  { name, price, description, category }: AddProductData,
  image: File,
  token: string
): Promise<ResponseProduct> => {
  const headers = {
    Authorization: `Bearer ${token}`,
    "content-type": "multipart/form-data",
  };
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/product/add`,
    {
      name: name,
      description: description,
      category: category,
      price: price,
      "product-img": image,
    },
    { timeout: 20000, headers }
  );
  return response.data;
};

export const fetchAllProducts = async (): Promise<ResponseProducts> => {
  // api call for getting all products
  const data = await axios
    .get(`${import.meta.env.VITE_API_URL}/product/?name=`)
    .catch((err) => err);
  return data.data;
};

export const updateProduct = async (
  { id, name, price, description, category }: EditProductData,
  token: string,
  image: File
) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    "content-type": "multipart/form-data",
  };
  const response = await axios.put(
    `${import.meta.env.VITE_API_URL}/product/update/${id}`,
    {
      name: name,
      description: description,
      category: category,
      price: price,
      "product-img": image,
    },
    { timeout: 20000, headers }
  );
  return response.data;
};

export const fetchProductById = async (
  // api call for getting product by id
  id: string
): Promise<ResponseProductById> => {
  const data = await axios
    .get(`${import.meta.env.VITE_API_URL}/product/${id}`)
    .catch((err) => err);
  return data.data;
};

export const deleteProductById = async (
  id: string,
  token: string
): Promise<ResponseProductById> => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const data = await axios
    .delete(`${import.meta.env.VITE_API_URL}/product/delete/${id}`, { headers })
    .catch((err) => err);
  return data.data;
};
