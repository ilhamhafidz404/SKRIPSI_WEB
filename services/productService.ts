import { ProductResponse } from "@/types/product";

export async function getProducts(page: number) {
  const res = await fetch(`http://localhost:8080/api/products?page=${page}`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export async function createProduct(formData: FormData) {
  const res = await fetch("http://localhost:8080/api/products", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to create product");
  }

  return res.json();
}

export const deleteProduct = async (id: number) => {
  const res = await fetch(`http://localhost:8080/api/products/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete product");
  }

  return res.json();
};
