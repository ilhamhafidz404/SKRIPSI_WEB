"use client";
import React, { useState } from "react";
import { useCreateProduct } from "@/hooks/useCreateProduct";

//
import CardComponent from "@/components/card/Card";
import DropzoneComponent from "@/components/form/DropZone";
import Button from "@/components/button/Button";
import Label from "@/components/form/Label";
import Input from "@/components/form/InputField";
import BreadcrumbComponent from "@/components/breadcrumb/Breadcrumb";
import Form from "@/components/form/Form";

export default function ProductCreatePage() {
  const createProductMutation = useCreateProduct();

  const [image, setImage] = useState<File | null>(null);
  const [form, setForm] = useState({
    name: "",
    code: "",
    price: "",
    stock: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => {
      const newForm = { ...prev, [name]: value };

      // Logika Auto-Generate Code jika input yang berubah adalah 'name'
      if (name === "name") {
        const words = value.trim().split(/\s+/);
        let initials = words
          .map((word) => word.charAt(0).toUpperCase())
          .join("")
          .slice(0, 3); // Ambil maks 3 inisial

        // Jika nama kosong, kosongkan juga kodenya
        if (value === "") {
          newForm.code = "";
        } else {
          // Gunakan angka acak atau statis sementara
          // Di produksi, angka ini sebaiknya di-generate di Backend
          // tapi untuk UX Frontend, kita bisa berikan placeholder/random
          const randomDigits = Math.floor(1000 + Math.random() * 9000);
          newForm.code = `${initials}${randomDigits}`;
        }
      }

      return newForm;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("code", form.code);
    formData.append("price", form.price);
    formData.append("stock", form.stock);

    if (image) {
      formData.append("image", image);
    }

    createProductMutation.mutate(formData);
  };

  const handleImageSelect = (file: File) => {
    setImage(file);
  };

  return (
    <>
      <BreadcrumbComponent pageTitle="Create Products" />

      <CardComponent title="Input Detail Product" className="mt-5">
        <Form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-10 items-center">
            <DropzoneComponent onFileSelect={handleImageSelect} />

            <div className="grid grid-cols-2 gap-5">
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
                  placeholder="Generated Code"
                  readonly
                  className="bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div>
                <Label>Price</Label>
                <Input
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  type="number"
                  placeholder="Product Price"
                />
              </div>

              <div>
                <Label>Stock</Label>
                <Input
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  type="number"
                  placeholder="Product Stock"
                />
              </div>

              <div className="col-span-2">
                <Button className="w-full">Submit</Button>
              </div>
            </div>
          </div>
        </Form>
      </CardComponent>
    </>
  );
}
