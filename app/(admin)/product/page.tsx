import BreadcrumbComponent from "@/components/breadcrumb/Breadcrumb";
import CardComponent from "@/components/card/Card";
import TableComponent from "@/components/table/Table";

export default function ProductPage() {
  return (
    <div>
      <BreadcrumbComponent pageTitle="Products" />
      <div className="space-y-6">
        <CardComponent title="Product List">
          <TableComponent
            tableCells={["Name", "Price", "Stock", "Action"]}
            tableData={[
              {
                id: 1,
                code: "A",
                image:
                  "https://blog.bestbuy.ca/wp-content/uploads/2017/03/Clothes.jpg",
                name: "Test",
                stock: 100,
                price: 10000,
              },
            ]}
          />
        </CardComponent>
      </div>
    </div>
  );
}
