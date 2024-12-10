import ProductDetail from "@/components/ui/common/ProductDetail";
import ProductDetailLoading from "@/components/ui/common/ProductDetail/ProductDetailLoading";
import { Suspense } from "react";
interface ProductPageProps {
    params: {
        slug: string;
    };
}
export default async function Page({params}:ProductPageProps) {
    return (
        <Suspense fallback={<ProductDetailLoading />}>
            <ProductDetail key={`detail_${params.slug}`} slug={params.slug} />
        </Suspense>
    )
}
