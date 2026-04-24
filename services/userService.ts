import API_URL from "@/lib/api";

export async function getUsers(page: number) {
  const res = await fetch(`${API_URL}/users?page=${page}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
}

export async function showUser(id: string) {
  const res = await fetch(`${API_URL}/users/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  return res.json();
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
