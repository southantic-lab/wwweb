import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/site/product-detail";
import { getProduct, products } from "@/lib/data";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

async function Detail({ params }: { params: PageProps<"/products/[slug]">["params"] }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}

export default function ProductPage({ params }: PageProps<"/products/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <Detail params={params} />
    </Suspense>
  );
}
