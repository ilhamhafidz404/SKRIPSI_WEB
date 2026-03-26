"use client";

import { useShowProduct } from "@/hooks/useProduct";
import { useParams, useRouter } from "next/navigation";

export default function ProductDetailPage() {
  const router = useRouter();

  const { code } = useParams<{ code: string }>();

  const { data, isLoading, error } = useShowProduct(code);

  console.log(data);

  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}
