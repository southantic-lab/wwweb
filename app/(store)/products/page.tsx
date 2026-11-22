import { Suspense } from "react";
import { Catalog } from "@/components/site/catalog";

export const metadata = { title: "Browse" };

export default function ProductsPage() {
  return (
    <Suspense>
      <Catalog />
    </Suspense>
  );
}
