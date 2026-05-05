// services/userService.ts
import api from "@/lib/axios";

export async function getUsers(page: number) {
  try {
    const res = await api.get("/users", {
      params: { page },
    });

    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch users");
  }
}

export async function showUser(id: string) {
  try {
    const res = await api.get(`/users/${id}`);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch user");
  }
}

// export async function createProduct(formData: FormData) {
//   const res = await fetch("http://localhost:8080/api/products", {
//     method: "POST",
//     body: formData,
//   });

//   if (!res.ok) {
//     throw new Error("Failed to create product");
//   }

//   return res.json();
// }

// export const updateProduct = async (id: number, data: FormData) => {
//   const res = await fetch(`http://localhost:8080/api/products/${id}`, {
//     method: "PUT",
//     body: data,
//   });

//   if (!res.ok) {
//     throw new Error("Failed to update product");
//   }

//   return res.json();
// };

// export const deleteProduct = async (id: number) => {
//   const res = await fetch(`http://localhost:8080/api/products/${id}`, {
//     method: "DELETE",
//   });

//   if (!res.ok) {
//     throw new Error("Failed to delete product");
//   }

//   return res.json();
// };
