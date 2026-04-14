"use client";

import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/services/userService";

export function useUsers(page: number) {
  return useQuery({
    queryKey: ["users", page],
    queryFn: () => getUsers(page),
  });
}

// export function useShowProduct(code: string) {
//   return useQuery({
//     queryKey: ["product", code],
//     queryFn: () => showProduct(code),
//   });
// }

export const updateUser = async (id: number, data: FormData) => {
  const res = await fetch(`http://localhost:8080/api/users/${id}`, {
    method: "PUT",
    body: data,
  });

  if (!res.ok) {
    throw new Error("Failed to update product");
  }

  return res.json();
};
