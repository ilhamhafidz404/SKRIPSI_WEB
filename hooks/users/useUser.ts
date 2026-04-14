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
