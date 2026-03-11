import { Table, TableBody, TableCell, TableHeader, TableRow } from "./ui";

import Image from "next/image";
import Button from "../button/Button";
import { formatRupiah } from "@/utils/FormatRupiah";

interface Product {
  id: number;
  code: string;
  name: string;
  image: string;
  stock: number;
  price: number;
}

export default function TableComponent({
  tableCells,
  tableData,
  onButtonDeleteClicked,
  onButtonEditClicked,
}: {
  tableCells: string[];
  tableData: Product[] | undefined;
  onButtonDeleteClicked: (id: number) => void;
  onButtonEditClicked?: (product: Product) => void;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/5 dark:bg-white/3">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-275.5">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/5">
              <TableRow>
                {tableCells.map((cell, index) => (
                  <TableCell
                    key={index}
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
              {tableData?.map((data) => (
                <TableRow key={data.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 overflow-hidden rounded relative">
                        <Image
                          src={`http://localhost:8080/uploads/${data.image}`}
                          alt={data.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {data.name}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {data.code}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    {formatRupiah(data.price)}
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    {data.stock}
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => onButtonEditClicked?.(data)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onButtonDeleteClicked(data.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
