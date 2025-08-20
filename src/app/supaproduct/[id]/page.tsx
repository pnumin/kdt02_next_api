import Link from "next/link";
import ProductDel from "@/app/supaproduct/ProductDel";
import { supabase } from "@/lib/supabase/client";

export default async function ProductId({params}:{params:Promise<{id:string}>}) {
  const { id } = await params
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id) // 'id' 컬럼의 값이 params.id와 같은(equal) 데이터를 필터링
    .single();    // 결과가 단일 객체임을 명시, 배열이 아닌 객체로 반환

  if (error) {
    return <p>데이터를 불러오는 중 에러가 발생했습니다.</p>;
  }

  return (
    <div className="container mx-auto min-h-screen p-5 bg-gray-50
                    flex justify-center items-center">
      <div className="w-2xl bg-white p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            {product.name}(supabase)
          </h1>
          <div>
            <ProductDel id={product.id} />
            <Link href={`/supaproduct/${id}/edit`} className="bg-green-600 text-white py-4 px-3 rounded-lg mr-2">
              수정 
            </Link>
            <Link href="/supaproduct" className="bg-blue-600 text-white p-4 rounded-lg">
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