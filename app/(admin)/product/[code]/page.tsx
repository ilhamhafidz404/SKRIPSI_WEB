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

// ── QR Verify Modal ───────────────────────────────────────────────────────────

function QRVerifyModal({ serial, onClose }: { serial: string; onClose: () => void }) {
  const qrUrl = `${API_URL}/items/${serial}/qr`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-80 rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full p-1 text-gray-400 hover:bg-gray-100"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Badge */}
        <div className="mb-4 flex items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-200">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
            QR Verifikasi Keaslian
          </span>
        </div>

        <p className="mb-1 text-center text-xs text-gray-400">Scan untuk memverifikasi keaslian produk</p>

        <div className="flex justify-center">
          <img src={qrUrl} alt="QR Verify" width={200} height={200} className="rounded-lg" />
        </div>

        <p className="mt-3 break-all text-center font-mono text-[9px] text-gray-300">{serial}</p>

        <a
          href={qrUrl}
          download={`qr-verify-${serial}.png`}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download PNG
        </a>
      </div>
    </div>
  );
}

// ── QR Claim Modal ────────────────────────────────────────────────────────────

function QRClaimModal({ serial, onClose }: { serial: string; onClose: () => void }) {
  const qrUrl = `${API_URL}/items/${serial}/claim-qr`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-80 rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full p-1 text-gray-400 hover:bg-gray-100"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Badge */}
        <div className="mb-4 flex items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700 ring-1 ring-red-200">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
            QR Klaim Kepemilikan
          </span>
        </div>

        {/* Warning */}
        <div className="mb-4 rounded-lg bg-amber-50 px-3 py-2 text-center ring-1 ring-amber-200">
          <p className="text-xs font-medium text-amber-700">⚠ Rahasia — Hanya untuk pembeli</p>
          <p className="mt-0.5 text-[10px] text-amber-600">QR ini hanya bisa digunakan sekali untuk mengklaim kepemilikan</p>
        </div>

        <p className="mb-1 text-center text-xs text-gray-400">Cetak dan letakkan di dalam kemasan produk</p>

        <div className="flex justify-center">
          <img src={qrUrl} alt="QR Claim" width={200} height={200} className="rounded-lg" />
        </div>

        <p className="mt-3 break-all text-center font-mono text-[9px] text-gray-300">{serial}</p>

        <a
          href={qrUrl}
          download={`qr-claim-${serial}.png`}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download & Print
        </a>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function ProductDetailPage() {
  const { code } = useParams<{ code: string }>();
  const { data, isLoading, error } = useShowProduct(code);

  const [qrVerifySerial, setQrVerifySerial] = useState<string | null>(null);
  const [qrClaimSerial, setQrClaimSerial] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="p-8 text-center animate-pulse">
        <p>Memuat detail produk...</p>
      </div>
    );
  }

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

        {/* ── Product Detail ── */}
        <CardComponent title="Product Detail">
          <div className="flex flex-col gap-8 p-4">
            <div className="relative w-full md:w-1/3 aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={`${IMAGE_URL}/${product.image}`}
                alt={product.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <small className="text-gray-500 uppercase tracking-wider text-xs font-semibold">
                  SKU: {product.code}
                </small>
                <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
              </div>

              <div className="border-y py-4">
                <p className="text-2xl font-semibold text-brand-500">
                  Rp {product.price?.toLocaleString("id-ID")}
                </p>
                <p className="text-sm">Stok tersedia: {product.stock}</p>
              </div>

              <div className="pt-2">
                <h3 className="font-medium text-gray-700">Deskripsi</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description || "Tidak ada deskripsi untuk produk ini."}
                </p>
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
                      Status Klaim
                    </TableCell>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs">
                      QR Verifikasi
                    </TableCell>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs">
                      QR Klaim
                    </TableCell>
                  </TableRow>
                </TableHeader>

                <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
                  {product?.items.map((item: any, idx: number) => (
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

                      {/* Status klaim */}
                      <TableCell className="px-5 py-4 text-start">
                        {item.claim_token_used ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 ring-1 ring-green-200">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                            Sudah Diklaim
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-200">
                            <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                            Belum Diklaim
                          </span>
                        )}
                      </TableCell>

                      {/* QR Verifikasi */}
                      <TableCell className="px-5 py-4 text-center">
                        <button
                          onClick={() => setQrVerifySerial(item.serial_number)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
                        >
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                            />
                          </svg>
                          Lihat QR
                        </button>
                      </TableCell>

                      {/* QR Klaim */}
                      <TableCell className="px-5 py-4 text-center">
                        {item.claim_token_used ? (
                          <span className="text-xs text-gray-300 italic">Sudah dipakai</span>
                        ) : (
                          <button
                            onClick={() => setQrClaimSerial(item.serial_number)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100"
                          >
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                              />
                            </svg>
                            Lihat QR Klaim
                          </button>
                        )}
                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-3 flex items-center gap-4 px-1">
            <p className="text-xs text-gray-400">
              Total: <span className="font-medium text-gray-600">{product?.items?.length} item</span>
            </p>
            <p className="text-xs text-gray-400">
              Diklaim: <span className="font-medium text-green-600">
                {product?.items?.filter((i: any) => i.claim_token_used).length}
              </span>
            </p>
            <p className="text-xs text-gray-400">
              Tersedia: <span className="font-medium text-gray-600">
                {product?.items?.filter((i: any) => !i.claim_token_used).length}
              </span>
            </p>
          </div>
        </CardComponent>
      </div>

      {/* Modals */}
      {qrVerifySerial && (
        <QRVerifyModal serial={qrVerifySerial} onClose={() => setQrVerifySerial(null)} />
      )}
      {qrClaimSerial && (
        <QRClaimModal serial={qrClaimSerial} onClose={() => setQrClaimSerial(null)} />
      )}
    </div>
  );
}