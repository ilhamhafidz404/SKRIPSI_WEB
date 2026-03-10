import { ProductResponse } from "@/types/product";

export async function getProducts(): Promise<ProductResponse> {
  const res = await fetch("http://localhost:8080/api/products");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}
