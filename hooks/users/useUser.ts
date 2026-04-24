"use client";

import { useQuery } from "@tanstack/react-query";
import { getUsers, showUser } from "@/services/userService";
const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export function useUsers(page: number) {
  return useQuery({
    queryKey: ["users", page],
    queryFn: () => getUsers(page),
  });
}

export function useShowUser(id: string) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => showUser(id),
  });
}



export const updateUser = async (id: number, data: FormData) => {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    body: data,
  });

  if (!res.ok) {
    throw new Error("Failed to update user");
  }

  return res.json();
};