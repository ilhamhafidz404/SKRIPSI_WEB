"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "@/services/productService";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      alert("Product created successfully");

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
}
