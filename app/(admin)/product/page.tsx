"use client";

import { useEffect, useState } from "react";

import { useProducts } from "@/hooks/useProduct";
import { useQueryClient } from "@tanstack/react-query";
import { getProducts } from "@/services/productService";

import BreadcrumbComponent from "@/components/breadcrumb/Breadcrumb";
import CardComponent from "@/components/card/Card";
import Pagination from "@/components/pagination/Pagination";
import TableComponent from "@/components/table/Table";
import { useModal } from "@/components/modal/hooks/useModal";
import ConfirmationModal from "@/components/modal/ui/ConfirmationModal";
import { useDeleteProduct } from "@/hooks/useDeleteProduct";
import { Product } from "@/types/product";
import Button from "@/components/button/Button";
import { IconPlus } from "@intentui/icons";
import ProductFormDrawer from "@/components/drawer/Drawer";

export default function ProductPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useProducts(page);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const deleteMutation = useDeleteProduct();
  const queryClient = useQueryClient();

  // Pre-fetch next page
  useEffect(() => {
    if (page < data?.meta.total_page) {
      queryClient.prefetchQuery({
        queryKey: ["products", page + 1],
        queryFn: () => getProducts(page + 1),
      });
    }
  }, [page]);

  // Modal delete
  const { isOpen, openModal, closeModal } = useModal();

  const handleDelete = () => {
    if (!selectedId) return;
    deleteMutation.mutate(selectedId, {
      onSuccess: () => {
        closeModal();
        setSelectedId(null);
      },
    });
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  const handleAdd = () => {
    setSelectedProduct(null);
    setIsDrawerOpen(true);
  };

  const resetDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedProduct(null);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products</p>;

  const handlePageChange = (newPage: number) => {
    if (newPage < 1) return;
    if (newPage > data.meta.total_page) return;
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <BreadcrumbComponent pageTitle="Products" />
      <div className="space-y-6">
        <CardComponent
          title="Product List"
          cardActions={
            <Button
              size="xs"
              variant="primary"
              startIcon={<IconPlus />}
              onClick={handleAdd}
            >
              Create New Product
            </Button>
          }
        >
          <TableComponent
            tableCells={["Name", "Price", "Stock", "Action"]}
            tableData={data?.data}
            onButtonEditClicked={(product: Product) => handleEdit(product)}
            onButtonDeleteClicked={(id: number) => {
              setSelectedId(id);
              openModal();
            }}
          />
        </CardComponent>

        <ConfirmationModal
          isOpen={isOpen}
          closeModal={closeModal}
          handleSubmit={handleDelete}
        />

        <ProductFormDrawer
          action={selectedProduct ? "Edit" : "Add"}
          isOpen={isDrawerOpen}
          onClose={resetDrawer}
          product={selectedProduct}
        />

        <Pagination
          currentPage={data.meta.page}
          totalPages={data.meta.total_page}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
