import { Table, TableBody, TableCell, TableHeader, TableRow } from "./ui";

interface TableComponentProps<T> {
  tableCells: string[];
  tableData: T[] | undefined;
  renderRow: (item: T) => React.ReactNode;
}

export default function TableComponent<T extends { id: number }>({
  tableCells,
  tableData,
  renderRow,
}: TableComponentProps<T>) {
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
              {tableData?.length ? (
                tableData.map((item) => (
                  <TableRow key={item.id}>{renderRow(item)}</TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={tableCells.length}
                    className="py-12 text-center text-gray-400"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-4xl">📦</span>
                      <span className="text-sm text-black dark:text-gray-400">
                        No data found
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
