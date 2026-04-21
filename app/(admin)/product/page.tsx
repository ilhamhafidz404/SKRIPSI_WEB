"use client";

import { useEffect, useState } from "react";

import { useProducts } from "@/hooks/products/useProduct";
import { useQueryClient } from "@tanstack/react-query";
import { getProducts } from "@/services/productService";

import BreadcrumbComponent from "@/components/breadcrumb/Breadcrumb";
import CardComponent from "@/components/card/Card";
import Pagination from "@/components/pagination/Pagination";
import TableComponent from "@/components/table/Table";
import { useModal } from "@/components/modal/hooks/useModal";
import ConfirmationModal from "@/components/modal/ui/ConfirmationModal";
import { useDeleteProduct } from "@/hooks/products/useDeleteProduct";
import { Product } from "@/types/product";
import Button from "@/components/button/Button";
import { IconPlus } from "@intentui/icons";
import ProductFormDrawer from "@/components/drawer/Drawer";
import { TableCell } from "@/components/table/ui";
import { formatRupiah } from "@/utils/FormatRupiah";
import Image from "next/image";
import IMAGE_URL from "@/lib/image";
import Link from "next/link";

type AlertType = { type: "success" | "error"; message: string } | null;

export default function ProductPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useProducts(page);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [alert, setAlert] = useState<AlertType>(null);

  const deleteMutation = useDeleteProduct();
  const queryClient = useQueryClient();

  // Auto-dismiss alert setelah 3 detik
  useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(() => setAlert(null), 3000);
    return () => clearTimeout(timer);
  }, [alert]);

  // Pre-fetch next page
  useEffect(() => {
    if (page < data?.meta.total_page) {
      queryClient.prefetchQuery({
        queryKey: ["products", page + 1],
        queryFn: () => getProducts(page + 1),
      });
    }
  }, [page]);

  const { isOpen, openModal, closeModal } = useModal();

  const handleDelete = () => {
    if (!selectedId) return;
    deleteMutation.mutate(selectedId, {
      onSuccess: () => {
        closeModal();
        setSelectedId(null);
        setAlert({ type: "success", message: "Product deleted successfully." });
      },
      onError: () => {
        closeModal();
        setAlert({
          type: "error",
          message: "Failed to delete product. Please try again.",
        });
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

      {/* Alert */}
      {alert && (
        <div
          className={`fixed top-5 right-5 z-99999 flex items-center gap-3 px-5 py-3 rounded-lg shadow-lg text-white text-sm transition-all duration-300 ${alert.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
        >
          <span>{alert.type === "success" ? "✅" : "❌"}</span>
          <span>{alert.message}</span>
          <button
            onClick={() => setAlert(null)}
            className="ml-2 text-white/70 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

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
            tableCells={["Product", "Price", "Stock", "Action"]}
            tableData={data?.data}
            renderRow={(product: Product) => (
              <>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <Link href={`/product/${product.code}`} >
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 overflow-hidden rounded relative">
                        <Image
                          src={`${IMAGE_URL}/${product.image}`}
                          alt={product.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {product.name}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {product.code}
                        </span>
                      </div>
                    </div>
                  </Link>
                </TableCell>

                {/* Kolom Price */}
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  {formatRupiah(product.price)}
                </TableCell>

                {/* Kolom Stock */}
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  {product.stock}
                </TableCell>

                {/* Kolom Action */}
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedId(product.id);
                        openModal();
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </>
            )}
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
          onSuccess={(message) => setAlert({ type: "success", message })}
          onError={(message) => setAlert({ type: "error", message })}
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
