"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import Label from "../form/Label";
import Input from "../form/InputField";
import DropzoneComponent from "../form/DropZone";
import { useUpdateProduct } from "@/hooks/useUpdateProduct";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export default function EditProductDrawer({ isOpen, onClose, product }: Props) {
  const updateMutation = useUpdateProduct();

  const [imageFile, setImageFile] = useState<File | null>(null);

  // Menggabungkan semua state ke dalam satu objek form agar konsisten dengan handleChange
  const [form, setForm] = useState({
    name: "",
    code: "",
    price: "",
    stock: "",
  });

  // Sync data ketika product berubah
  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        code: product.code || "",
        price: product.price?.toString() || "0",
        stock: product.stock?.toString() || "0",
      });
      setImageFile(null);
    }
  }, [product]);

  const handleImageSelect = (file: File) => {
    setImageFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => {
      const newForm = { ...prev, [name]: value };

      // Logika Auto-Generate Code jika input yang berubah adalah 'name'
      // Hanya generate jika ini produk baru atau Anda memang ingin kodenya berubah otomatis
      if (name === "name") {
        const words = value.trim().split(/\s+/);
        let initials = words
          .map((word) => word.charAt(0).toUpperCase())
          .join("")
          .slice(0, 3);

        if (value === "") {
          newForm.code = "";
        } else {
          // Note: Biasanya saat EDIT, kode produk tidak berubah otomatis.
          // Hapus blok ini jika kode harus tetap permanen.
          const randomDigits = Math.floor(1000 + Math.random() * 9000);
          newForm.code = `${initials}${randomDigits}`;
        }
      }

      return newForm;
    });
  };

  const handleSubmit = () => {
    if (!product) return;

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("code", form.code);
    formData.append("price", form.price);
    formData.append("stock", form.stock);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    updateMutation.mutate(
      {
        id: product.id,
        data: formData,
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] ${isOpen ? "visible" : "invisible"}`}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Drawer */}
      <div
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h2 className="text-lg font-semibold">Edit Product</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-black"
            >
              ✕
            </button>
          </div>

          {/* Form Content */}
          <div className="space-y-4 flex-1 overflow-y-auto pr-2">
            <div>
              <Label>Image</Label>
              <DropzoneComponent
                onFileSelect={handleImageSelect}
                defaultImage={
                  product?.image
                    ? `http://localhost:8080/uploads/${product.image}`
                    : undefined
                }
              />
            </div>

            <div>
              <Label>Name</Label>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                type="text"
                placeholder="Product Name"
              />
            </div>

            <div>
              <Label>Code</Label>
              <Input
                name="code"
                value={form.code}
                onChange={handleChange}
                type="text"
                readonly
                className="bg-gray-100"
                placeholder="Product Code"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Price</Label>
                <Input
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  type="number"
                  placeholder="0"
                />
              </div>

              <div>
                <Label>Stock</Label>
                <Input
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  type="number"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex justify-end gap-3 border-t pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={updateMutation.isPending}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg disabled:opacity-50 hover:bg-blue-700 transition-colors"
            >
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
