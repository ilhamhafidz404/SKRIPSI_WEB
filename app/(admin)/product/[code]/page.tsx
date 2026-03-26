// app/products/[slug]/page.js

export default async function ProductShowPage({
  params,
}: {
  params: { code: string };
}) {
  const { code } = await params;

  return (
    <div>
      <h1>Detail Produk</h1>
      <p>
        Menampilkan produk dengan code: <strong>{code}</strong>
      </p>
    </div>
  );
}
