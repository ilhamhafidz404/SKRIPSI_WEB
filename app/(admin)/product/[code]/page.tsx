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

function QRModal({ serial, onClose }: { serial: string; onClose: () => void }) {
  const qrUrl = `http://localhost:8080/api/items/${serial}/qr`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <p className="mb-3 text-center text-sm font-medium text-gray-700">
          QR Code Verifikasi
        </p>
        <img
          src={qrUrl}
          alt="QR Code"
          width={220}
          height={220}
          className="rounded-lg"
        />
        <p className="mt-3 max-w-55 break-all text-center font-mono text-[10px] text-gray-400">
          {serial}
        </p>
        <a
          href={qrUrl}
          download={`qr-${serial}.png`}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Download PNG
        </a>
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  const { code } = useParams<{ code: string }>();
  const { data, isLoading, error } = useShowProduct(code);
  const [qrSerial, setQrSerial] = useState<string | null>(null);

  // Helper untuk menampilkan state loading
  if (isLoading) {
    return (
      <div className="p-8 text-center animate-pulse">
        <p>Memuat detail produk...</p>
      </div>
    );
  }

  // Helper untuk menampilkan state error
  if (error || !data) {
    return (
      <div className="p-8 text-center text-red-500">
        <p>Gagal mengambil data produk. Silakan coba lagi nanti.</p>
      </div>
    );
  }

  const product = data.data;

  return (
    <div className="space-y-6">
      <BreadcrumbComponent pageTitle="Products" />

      <div className="grid grid-cols-3 gap-5">
        <CardComponent title="Product Detail">
          <div className="flex flex-col gap-8 p-4">
            {/* Bagian Gambar */}
            <div className="relative w-full md:w-1/3 aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={`http://localhost:8080/uploads/${product.image}`}
                alt={product.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Bagian Informasi */}
            <div className="flex-1 space-y-4">
              <div>
                <small className="text-gray-500 uppercase tracking-wider text-xs font-semibold">
                  SKU: {product.code}
                </small>
                <h1 className="text-3xl font-bold text-gray-800">
                  {product.name}
                </h1>
              </div>

              <div className="border-y py-4">
                <p className="text-2xl font-semibold text-brand-500">
                  Rp {product.price?.toLocaleString("id-ID")}
                </p>
                <p className={`text-sm`}>Stok tersedia: {product.stock}</p>
              </div>

              <div className="pt-2">
                <h3 className="font-medium text-gray-700">Deskripsi</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description ||
                    "Tidak ada deskripsi untuk produk ini."}
                </p>
              </div>
            </div>
          </div>
        </CardComponent>
        <CardComponent title="Product Items" className="col-span-2">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/5 dark:bg-white/3">
            <div className="max-w-full overflow-x-auto">
              <div className="min-w-275.5">
                <Table>
                  {/* Table Header */}
                  <TableHeader className="border-b border-gray-100 dark:border-white/5">
                    <TableRow>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Serial Number
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        QR Code
                      </TableCell>
                    </TableRow>
                  </TableHeader>

                  {/* Table Body */}
                  <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
                    {product?.items.map((item: any) => (
                      <TableRow key={item.id}>
                        <TableCell className="px-5 py-4 sm:px-6 text-start">
                          {item.serial_number}
                        </TableCell>
                        <TableCell className="px-5 py-4 sm:px-6 text-start">
                          <button
                            onClick={() => setQrSerial(item.serial_number)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
                          >
                            <svg
                              className="h-3.5 w-3.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                              />
                            </svg>
                            Lihat QR
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </CardComponent>
      </div>

      {/* QR Modal */}
      {qrSerial && (
        <QRModal serial={qrSerial} onClose={() => setQrSerial(null)} />
      )}
    </div>
  );
}
