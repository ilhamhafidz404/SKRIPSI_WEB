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

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // sync data ketika product berubah
  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setCode(product.code || "");
      setPrice(product.price || 0);
      setStock(product.stock || 0);
      setImageFile(null);
    }
  }, [product]);

  const handleImageSelect = (file: File) => {
    setImageFile(file);
  };

  const handleSubmit = () => {
    if (!product) return;

    const formData = new FormData();

    formData.append("name", name);
    formData.append("code", code);
    formData.append("price", price.toString());
    formData.append("stock", stock.toString());

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
      className={`fixed inset-0 z-999999 m-0! ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
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
        className={`absolute right-0 top-0 h-full w-105 bg-white shadow-xl
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 border-b pb-6">
            <h2 className="text-lg font-semibold">Edit Product</h2>

            <button
              onClick={onClose}
              className="text-gray-500 hover:text-black"
            >
              ✕
            </button>
          </div>

          {/* Form */}
          <div className="space-y-4 flex-1 overflow-y-auto mt-6">
            {/* Image */}
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

            {/* Name */}
            <div>
              <Label>Name</Label>

              <Input
                name="name"
                value={name}
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Product Name"
              />
            </div>

            {/* Code */}
            <div>
              <Label>Code</Label>

              <Input
                name="code"
                value={code}
                defaultValue={code}
                onChange={(e) => setCode(e.target.value)}
                type="text"
                placeholder="Product Code"
              />
            </div>

            {/* Price */}
            <div>
              <Label>Price</Label>

              <Input
                name="price"
                value={price}
                defaultValue={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                type="number"
                placeholder="Product Price"
              />
            </div>

            {/* Stock */}
            <div>
              <Label>Stock</Label>

              <Input
                name="stock"
                value={stock}
                defaultValue={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                type="number"
                placeholder="Product Stock"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex justify-end gap-3">
            <button onClick={onClose} className="border px-4 py-2 rounded">
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={updateMutation.isPending}
              className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {updateMutation.isPending ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
