import type { Product } from "@/types/product";
import Link from "next/link";
import ProductCard from "@/app/supaproduct/ProductCard";
import { supabase } from "@/lib/supabase/client";

export default async function Product() {
  const { data : products, error} = await supabase
    .from('products')
    .select('*')

  if (error) {
    return <h1> 데이터를 불러오는데 오류가 발생했습니다. </h1>
  }
  // console.log(products)
  return (
    <div className="container mx-auto min-h-screen p-5 bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          상품목록(Supabase)
        </h1>
        <div>
          <Link href="/supaproduct/new" className="bg-green-600 text-white p-4 rounded-lg mr-2">
            상품추가
          </Link>
          <Link href="/" className="bg-blue-600 text-white p-4 rounded-lg">
            홈으로
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {
          products.map(item => <ProductCard key={item.id} 
                                                    product={item} />
          )
        }
      </div>
    </div>
  );
}