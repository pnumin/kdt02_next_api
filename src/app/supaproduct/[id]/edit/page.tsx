import Link from "next/link";
import ProductForm from "@/app/supaproduct/ProductForm";
import { supabase } from "@/lib/supabase/client";

export default async function EditProduct({params}:{params:Promise<{id:string}>}) { 
  const { id } = await params;
  const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id) // 'id' 컬럼의 값이 params.id와 같은(equal) 데이터를 필터링
      .single();    // 결과가 단일 객체임을 명시, 배열이 아닌 객체로 반환
  
    if (error) {
      return <p>데이터를 불러오는 중 에러가 발생했습니다.</p>;
    }

  return (
    <div className="container mx-auto min-h-screen p-5 bg-gray-50"> 
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          상품수정 [{product.id}:{product.name}]
        </h1>
        <div>
          <Link href="/product" className="bg-blue-600 text-white p-4 rounded-lg">
            상품목록으로
          </Link>
        </div>
      </div>
      <ProductForm product={product}/>
    </div>
  );
}