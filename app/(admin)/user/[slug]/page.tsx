"use client";

import Image from "next/image";
import BreadcrumbComponent from "@/components/breadcrumb/Breadcrumb";
import CardComponent from "@/components/card/Card";
import { useShowProduct } from "@/hooks/products/useProduct";
import { useParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/table/ui";
import { useState } from "react";
import API_URL from "@/lib/api";
import IMAGE_URL from "@/lib/image";
import { useShowUser } from "@/hooks/users/useUser";


// ── Main Page ─────────────────────────────────────────────────────────────────

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, error } = useShowUser(slug);



  if (isLoading) {
    return (
      <div className="p-8 text-center animate-pulse">
        <p>Memuat detail user...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-8 text-center text-red-500">
        <p>Gagal mengambil data user. Silakan coba lagi nanti.</p>
      </div>
    );
  }

  const user = data.data;

  return (
    <div className="space-y-6">
      <BreadcrumbComponent pageTitle="User" />

      <div className="grid grid-cols-3 gap-5">

        {/* ── Product Detail ── */}
        <CardComponent title="Product Detail">
          <div className="flex flex-col gap-8 p-4">
            {/* <div className="relative w-full md:w-1/3 aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={`${IMAGE_URL}/${user.image}`}
                alt={user.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div> */}

            <div className="flex-1 space-y-4">
              <div>
                <small className="text-gray-500 uppercase tracking-wider text-xs font-semibold">
                  Google Id: {user.user.google_id}
                </small>
                <h1 className="text-3xl font-bold text-gray-800">{user.user.name}</h1>
                <small className="text-gray-500 uppercase tracking-wider text-xs font-semibold">
                  {user.user.email}
                </small>
              </div>
            </div>
          </div>
        </CardComponent>

        {/* ── Product Items ── */}
        <CardComponent title="Product Items" className="col-span-2">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/5 dark:bg-white/3">
            <div className="max-w-full overflow-x-auto">
              <Table>
                <TableHeader className="border-b border-gray-100 dark:border-white/5">
                  <TableRow>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs">
                      No
                    </TableCell>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs">
                      Serial Number
                    </TableCell>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs">
                      Claimed At
                    </TableCell>
                  </TableRow>
                </TableHeader>

                <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
                  {!user?.product_items || user.product_items.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="px-5 py-6 text-center text-gray-400 text-sm">
                        Tidak ada product item
                      </TableCell>
                    </TableRow>
                  ) : (
                    user.product_items.map((item: any, idx: number) => (
                      <TableRow key={item.id}>

                        {/* No */}
                        <TableCell className="px-5 py-4 text-gray-400 text-sm">
                          {idx + 1}
                        </TableCell>

                        {/* Serial number */}
                        <TableCell className="px-5 py-4 text-start">
                          <span className="font-mono text-xs text-gray-700">
                            {item.serial_number.slice(0, 8)}...{item.serial_number.slice(-4)}
                          </span>
                        </TableCell>

                        {/* Claimed At */}
                        <TableCell className="px-5 py-4 text-start">
                          {item.claimed_at
                            ? new Date(item.claimed_at).toLocaleString()
                            : "Not claimed"}
                        </TableCell>

                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardComponent>
      </div>
    </div>
  );
}