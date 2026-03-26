"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Product } from "@/types/product";
import Label from "../form/Label";
import Input from "../form/InputField";
import DropzoneComponent from "../form/DropZone";
import { useUpdateProduct } from "@/hooks/useUpdateProduct";
import { useCreateProduct } from "@/hooks/useCreateProduct";

interface Props {
  action: "Add" | "Edit";
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
}

interface ProductFormValues {
  name: string;
  code: string;
  price: string;
  stock: string;
}

export default function ProductFormDrawer({
  action,
  isOpen,
  onClose,
  product,
}: Props) {
  const updateMutation = useUpdateProduct();
  const createMutation = useCreateProduct();

  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormValues>({
    defaultValues: {
      name: "",
      code: "",
      price: "",
      stock: "",
    },
  });

  // Reset form setiap kali drawer dibuka
  useEffect(() => {
    if (isOpen) {
      reset({
        name: product?.name || "",
        code: product?.code || "",
        price: product?.price?.toString() || "",
        stock: product?.stock?.toString() || "",
      });
      setImageFile(null);
    }
  }, [isOpen, product, reset]);

  // Auto-generate code dari nama produk
  const nameValue = watch("name");
  useEffect(() => {
    if (nameValue === "") {
      setValue("code", "");
    } else {
      const words = nameValue.trim().split(/\s+/);
      const initials = words
        .map((word) => word.charAt(0).toUpperCase())
        .join("")
        .slice(0, 3);
      const randomDigits = Math.floor(1000 + Math.random() * 9000);
      setValue("code", `${initials}${randomDigits}`);
    }
  }, [nameValue, setValue]);

  const handleImageSelect = (file: File) => {
    setImageFile(file);
  };

  const onSubmit = (data: ProductFormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("code", data.code);
    formData.append("price", data.price);
    formData.append("stock", data.stock);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    if (action === "Edit" && product) {
      updateMutation.mutate(
        { id: product.id, data: formData },
        { onSuccess: () => onClose() },
      );
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => onClose(),
      });
    }
  };

  const isPending = updateMutation.isPending || createMutation.isPending;

  return (
    <div
      className={`fixed inset-0 h-screen z-9999999 ${isOpen ? "visible" : "invisible"}`}
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
            <h2 className="text-lg font-semibold">{action} Product</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-black"
            >
              ✕
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 flex-1 overflow-y-auto pr-2 flex flex-col"
          >
            <div className="space-y-4 flex-1">
              <div>
                <Label>Image</Label>
                <DropzoneComponent
                  key={isOpen ? (product?.id ?? "new") : "closed"}
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
                  type="text"
                  placeholder="Product Name"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <Label>Code</Label>
                <Input
                  type="text"
                  placeholder="Product Code"
                  readonly
                  className="bg-gray-100"
                  {...register("code")}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Price</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    {...register("price", {
                      required: "Price is required",
                      min: { value: 0, message: "Price must be positive" },
                    })}
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label>Stock</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    {...register("stock", {
                      required: "Stock is required",
                      min: { value: 0, message: "Stock must be positive" },
                    })}
                  />
                  {errors.stock && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.stock.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-end gap-3 border-t pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isPending}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg disabled:opacity-50 hover:bg-blue-700 transition-colors"
              >
                {isPending
                  ? "Saving..."
                  : action === "Edit"
                    ? "Save Changes"
                    : "Create Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
