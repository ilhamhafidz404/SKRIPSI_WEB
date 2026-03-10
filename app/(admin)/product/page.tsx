"use client";

import BreadcrumbComponent from "@/components/breadcrumb/Breadcrumb";
import CardComponent from "@/components/card/Card";
import Pagination from "@/components/pagination/Pagination";
import TableComponent from "@/components/table/Table";
import { useProducts } from "@/hooks/useProduct";
import { getProducts } from "@/services/productService";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useProducts(page);

  // pre-fetch next page
  const queryClient = useQueryClient();

  useEffect(() => {
    if (page < data?.meta.total_page) {
      queryClient.prefetchQuery({
        queryKey: ["products", page + 1],
        queryFn: () => getProducts(page + 1),
      });
    }
  }, [page]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products</p>;

  const handlePageChange = (newPage: number) => {
    if (newPage < 1) return;
    if (newPage > data.meta.total_page) return;

    setPage(newPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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

        <Pagination
          currentPage={data.meta.page}
          totalPages={data.meta.total_page}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
