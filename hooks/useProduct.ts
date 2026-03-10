"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/productService";

export function useProducts(page: number) {
  return useQuery({
    queryKey: ["products", page],
    queryFn: () => getProducts(page),
  });
}
