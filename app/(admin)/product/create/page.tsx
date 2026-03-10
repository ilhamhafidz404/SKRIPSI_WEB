"use client";
import React, { useState } from "react";
import CardComponent from "@/components/card/Card";
import DropzoneComponent from "@/components/form/DropZone";
import Button from "@/components/button/Button";
import Label from "@/components/form/Label";
import Input from "@/components/form/InputField";
import BreadcrumbComponent from "@/components/breadcrumb/Breadcrumb";
import Form from "@/components/form/Form";

export default function ProductCreatePage() {
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

    console.log(formData);

    try {
      const res = await fetch("http://localhost:8080/api/products", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log(data);

      alert("Product created successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageSelect = (file: File) => {
    setImage(file);
  };

  return (
    <>
      <BreadcrumbComponent pageTitle="Create Products" />

      <CardComponent title="Input Detail" className="mt-5">
        <Form onSubmit={handleSubmit}>
          <DropzoneComponent onFileSelect={handleImageSelect} />

          <div className="space-y-6 grid grid-cols-2 gap-5">
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
        </Form>
      </CardComponent>
    </>
  );
}
