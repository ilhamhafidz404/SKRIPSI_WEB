"use client";

import BreadcrumbComponent from "@/components/breadcrumb/Breadcrumb";
import CardComponent from "@/components/card/Card";
import TableComponent from "@/components/table/Table";
import { useProducts } from "@/hooks/useProduct";

export default function ProductPage() {
  const { data, isLoading, error } = useProducts();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products</p>;

  console.log(data);

  return (
    <div>
      <BreadcrumbComponent pageTitle="Products" />
      <div className="space-y-6">
        <CardComponent title="Product List">
          <TableComponent
            tableCells={["Name", "Price", "Stock", "Action"]}
            tableData={data?.data}
          />
        </CardComponent>
      </div>
    </div>
  );
}
