"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts, showProduct } from "@/services/productService";

export function useProducts(page: number) {
  return useQuery({
    queryKey: ["products", page],
    queryFn: () => getProducts(page),
  });
}

export function useShowProduct(code: string) {
  return useQuery({
    queryKey: ["product", code],
    queryFn: () => showProduct(code),
  });
}
