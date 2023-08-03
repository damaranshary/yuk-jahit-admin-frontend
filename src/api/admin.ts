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

export const fetchLoginData = async ({
  email,
  password,
}: LoginFormData): Promise<ResponseAdminLogin> => {
  const data = await axios
    .post(`${import.meta.env.VITE_API_URL}/admin/login`, { email, password })
    .catch((err) => err);
  return data.data;
};
