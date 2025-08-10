import type { Product } from "@/types/product";
import Link from "next/link";
import ProductDel from "../ProductDel";

interface ProductIdProps {
  params: Promise <{
    id: string;
  }>;
}

async function getProduct(id: string): Promise<Product> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const resp = await fetch(`${baseUrl}/api/products/${id}`, {
    cache: "no-store"
  });

  if (!resp.ok) throw new Error('Fetch Error');

  return resp.json();
}

export default async function ProductId( props: ProductIdProps) {
  const { id } = await props.params
  const product = await getProduct(id);

  return (
    <div className="container mx-auto min-h-screen p-5 bg-gray-50
                    flex justify-center items-center">
      <div className="w-2xl bg-white p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            {product.name}
          </h1>
          <div>
            <ProductDel id={product.id} />
            <Link href={`/product/${id}/edit`} className="bg-green-600 text-white py-4 px-3 rounded-lg mr-2">
              수정 
            </Link>
            <Link href="/product" className="bg-blue-600 text-white p-4 rounded-lg">
              목록으로
            </Link>

          </div>
        </div>
        <div className="text-gray-500">
          <span className="font-bold mr-4">카테고리:</span>
          <span>{product.category}</span>
        </div>
        <div className="text-gray-500">
          <span className="font-bold mr-4">상세설명:</span>
          {product.description}
        </div>
        <div className="text-2xl font-bold text-blue-700 text-right mt-8">
          {product.price.toLocaleString()}원
        </div>
      </div>
    </div>
  );
}