
import Link from "next/link";
import ProductForm from "@/app/supaproduct/ProductForm";

export default function NewProduct() {
  return (
    <div className="container mx-auto min-h-screen p-5 bg-gray-50"> 
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          상품추가(supabase)
        </h1>
        <div>
          <Link href="/supaproduct" className="bg-blue-600 text-white p-4 rounded-lg">
            상품목록으로
          </Link>
        </div>
      </div>
      <ProductForm />
    </div>
  );
}