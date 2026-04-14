"use client";

import { useEffect, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";

import BreadcrumbComponent from "@/components/breadcrumb/Breadcrumb";
import CardComponent from "@/components/card/Card";
import Pagination from "@/components/pagination/Pagination";
import TableComponent from "@/components/table/Table";
import { useModal } from "@/components/modal/hooks/useModal";
import ConfirmationModal from "@/components/modal/ui/ConfirmationModal";
import Button from "@/components/button/Button";
import { TableCell } from "@/components/table/ui";
import { getUsers } from "@/services/userService";
import { useUsers } from "@/hooks/users/useUser";
import { useUpdateUser } from "@/hooks/users/useUpdateUser";

type AlertType = { type: "success" | "error"; message: string } | null;

export default function ProductPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useUsers(page);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [alert, setAlert] = useState<AlertType>(null);

  const updateMutation = useUpdateUser();
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
        queryKey: ["users", page + 1],
        queryFn: () => getUsers(page + 1),
      });
    }
  }, [page]);

  const { isOpen, openModal, closeModal } = useModal();

  const handleToggleActive = () => {
    // Gunakan selectedUser yang sudah diset di tombol aksi
    if (!selectedUser) return;

    const formData = new FormData();
    // Menggunakan status kebalikan dari status saat ini
    formData.append("is_active", (!selectedUser.is_active).toString());

    updateMutation.mutate(
      { id: selectedUser.id, data: formData },
      {
        onSuccess: () => {
          closeModal();
          // Reset user setelah sukses
          setSelectedUser(undefined);
          queryClient.invalidateQueries({ queryKey: ["users"] });
          setAlert({
            type: "success",
            message: "User status updated successfully.",
          });
        },
        onError: () => {
          closeModal();
          setAlert({
            type: "error",
            message: "Failed to update user. Please try again.",
          });
        },
      },
    );
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users</p>;

  const handlePageChange = (newPage: number) => {
    if (newPage < 1) return;
    if (newPage > data.meta.total_page) return;
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <BreadcrumbComponent pageTitle="Users" />

      {/* Alert */}
      {alert && (
        <div
          className={`fixed top-5 right-5 z-99999 flex items-center gap-3 px-5 py-3 rounded-lg shadow-lg text-white text-sm transition-all duration-300 ${
            alert.type === "success" ? "bg-green-500" : "bg-red-500"
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
        <CardComponent title="User List">
          <TableComponent
            tableCells={["User", "Email", "Status", "Action"]}
            tableData={data?.data}
            renderRow={(user: User) => (
              <>
                {/* Kolom User (Avatar + Name) */}
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    {/* <div className="w-10 h-10 overflow-hidden rounded-full relative">
                      <Image
                        src={`http://localhost:8080/uploads/${user.avatar}`}
                        alt={user.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div> */}
                    <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {user.name}
                    </span>
                  </div>
                </TableCell>

                {/* Kolom Email */}
                <TableCell className="px-5 py-4 sm:px-6 text-start text-gray-500 text-theme-sm">
                  {user.email}
                </TableCell>

                {/* Kolom Status */}
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.is_active
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {user.is_active ? "Active" : "Inactive"}
                  </span>
                </TableCell>

                {/* Kolom Action */}
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedUser(user);
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
          handleSubmit={handleToggleActive}
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
