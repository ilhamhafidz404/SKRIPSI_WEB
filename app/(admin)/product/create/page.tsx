"use client";
import React, { useState } from "react";
import CardComponent from "@/components/card/Card";
import DropzoneComponent from "@/components/form/DropZone";
import Button from "@/components/button/Button";
import Label from "@/components/form/Label";
import Input from "@/components/form/InputField";
import BreadcrumbComponent from "@/components/breadcrumb/Breadcrumb";

export default function ProductCreatePage() {
  return (
    <>
      <BreadcrumbComponent pageTitle="Create Products" />

      <CardComponent title="Upload Image">
        <DropzoneComponent />
      </CardComponent>

      <CardComponent title="Input Detail" className="mt-5">
        <div className="space-y-6 grid grid-cols-2 gap-5">
          <div>
            <Label>Name</Label>
            <Input type="text" placeholder="Product Name" />
          </div>
          <div>
            <Label>Code</Label>
            <Input type="text" placeholder="Product Code: ABC" />
          </div>
          <div>
            <Label>Price</Label>
            <Input type="text" placeholder="Product Price" />
          </div>
          <div>
            <Label>Stock</Label>
            <Input type="text" placeholder="Product Max Stock" />
          </div>
          <div className="col-span-2">
            <Button className="w-full">Submit</Button>
          </div>
        </div>
      </CardComponent>
    </>
  );
}
