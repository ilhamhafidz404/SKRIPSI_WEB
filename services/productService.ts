import api from "@/lib/axios";

export const getProducts = async (page: number) => {
  const res = await api.get("/products", { params: { page } });
  return res.data;
};

export const showProduct = async (code: string) => {
  const res = await api.get(`/products/${code}`);
  return res.data;
};

export const createProduct = async (data: FormData) => {
  const res = await api.post("/products", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const updateProduct = async (id: number, data: FormData) => {
  const res = await api.put(`/products/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const deleteProduct = async (id: number) => {
  const res = await api.delete(`/products/${id}`);
  return res.data;
};