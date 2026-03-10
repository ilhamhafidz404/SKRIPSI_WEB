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
    setForm({
      ...form,
      [e.target.name]: e.target.value,
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
                  placeholder="Product Code"
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
