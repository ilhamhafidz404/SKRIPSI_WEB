import API_URL from "@/lib/api";

export const getProducts = async (page: number) => {
  const res = await fetch(`${API_URL}/products?page=${page}`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
};

export const showProduct = async (code: string) => {
  const res = await fetch(`${API_URL}/products/${code}`);

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
};

export const createProduct = async (data: FormData) => {
  const res = await fetch(`${API_URL}/products`, {
    method: "POST",
    body: data,
  });

  if (!res.ok) {
    throw new Error("Failed to create product");
  }

  return res.json();
};

export const updateProduct = async (id: number, data: FormData) => {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "PUT",
    body: data,
  });

  if (!res.ok) {
    throw new Error("Failed to update product");
  }

  return res.json();
};

export const deleteProduct = async (id: number) => {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete product");
  }

  return res.json();
};