'use client'; 

import { useRouter } from "next/navigation";
import { supabase } from '@/lib/supabase/client';

interface ProductDelProps {
  id : string
}

export default function ProductDel({id}:ProductDelProps) {
  const router = useRouter() ;

  const handleDelete = async() =>{
    
    if (confirm("이상품을 삭제하시겠습니까?")) {
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);
  
        if (error) {
          alert(`삭제오류 :${error.message}`)
        }
        else {
          alert("정상적으로 삭제되었습니다.");
          router.push("/supaproduct")
          router.refresh();
        }
    }
  }
  return (
    <button className="bg-red-600 text-white p-3 rounded-lg mr-2"
            onClick = {handleDelete}>
      삭제
    </button>
  );
}