"use client";

import { Product } from "@/types/product";
import Label from "../form/Label";
import Input from "../form/InputField";
import DropzoneComponent from "../form/DropZone";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export default function EditProductDrawer({ isOpen, onClose, product }: Props) {
  const handleImageSelect = (file: File) => {
    // setImage(file);
  };

  return (
    <div
      className={`fixed inset-0 z-999999999 m-0! ${
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
          <div className="space-y-4 flex-1 mt-10">
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
                value={product?.name}
                defaultValue={product?.name}
                // onChange={handleChange}
                type="text"
                placeholder="Product Name"
              />
            </div>

            <div>
              <Label>Code</Label>
              <Input
                name="code"
                value={product?.code}
                defaultValue={product?.code}
                // onChange={handleChange}
                type="text"
                placeholder="Product Code"
              />
            </div>

            <div>
              <Label>Price</Label>
              <Input
                name="price"
                value={product?.price}
                defaultValue={product?.price}
                // onChange={handleChange}
                type="number"
                placeholder="Product Price"
              />
            </div>

            <div>
              <Label>Stock</Label>
              <Input
                name="stock"
                value={product?.stock}
                defaultValue={product?.stock}
                // onChange={handleChange}
                type="number"
                placeholder="Product Stock"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex justify-end gap-2">
            <button onClick={onClose} className="border px-4 py-2 rounded">
              Cancel
            </button>

            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
