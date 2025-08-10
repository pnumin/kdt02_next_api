import type { Product } from "@/types/product";
import Link from "next/link";
import ProductCard from "./ProductCard";

async function getProducts() : Promise<Product[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ;
  const resp = await fetch(`${baseUrl}/api/products`, {
    cache : "no-store"
  }) ;
  
  if (!resp.ok) throw new Error('Fetch Error') ;

  return resp.json() ;
}

export default async function Product() {
  const products =  getProducts() ;
  // console.log(products)
  return (
    <div className="container mx-auto min-h-screen p-5 bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          상품목록
        </h1>
        <div>
          <Link href="/product/new" className="bg-green-600 text-white p-4 rounded-lg mr-2">
            상품추가
          </Link>
          <Link href="/" className="bg-blue-600 text-white p-4 rounded-lg">
            홈으로
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {
          (await products).map(item => <ProductCard key={item.id} 
                                                    product={item} />
          )
        }
      </div>
    </div>
  );
}