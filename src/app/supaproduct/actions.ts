'use server'; // 이 파일의 함수들은 서버에서만 실행됨을 명시합니다.

import { supabase } from '@/lib/supabase/client';
import { revalidatePath } from 'next/cache';
import { redirect } from "next/navigation"

// Create (생성)
export async function addProduct(formData: FormData) {
  const name = formData.get('name');
  const category = formData.get('category');
  const price = formData.get('price');
  const description = formData.get('description');

  //추가될 자료의 ID 생성
  const newId = Date.now().toString() ;
  await supabase.from('products').insert({
    // id는 보통 자동으로 생성되게 하지만, 여기서는 예제에 따라 입력받습니다.
    id: newId,
    name,
    category,
    price: parseInt(String(price)),
    description
  });

  revalidatePath('/supaproduct'); // 데이터 변경 후, 해당 경로의 캐시를 무효화하여 화면을 갱신합니다.
  redirect('/supaproduct');
}

// Update (수정)
export async function updateProduct(formData: FormData) {
  const id = formData.get('id') as string;
  const category = formData.get('category') as string;
  const name = formData.get('name') as string;
  const price = formData.get('price') as string;
  const description = formData.get('description') as string;

  await supabase
    .from('products')
    .update({ name, category, price: parseInt(price), description })
    .eq('id', id);

  revalidatePath('/supaproduct');
  redirect('/supaproduct');
}


// Delete (삭제)
export async function deleteProduct(formData: FormData) {
  const id = formData.get('id') as string;

  await supabase
    .from('products')
    .delete()
    .eq('id', id);

  revalidatePath('/supaproduct');
  redirect('/supaproduct');
}