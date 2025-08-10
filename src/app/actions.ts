'use server'

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export interface FormStatus {
  message: string;
}

export async function createProductAction(prevState: FormStatus, formData: FormData): Promise<FormStatus> {
  const name = formData.get('name');
  const category = formData.get('category');
  const price = parseInt(String(formData.get('price')?? '0'));
  const description = formData.get('description');

  console.log('createProductAction', name)
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const resp = await fetch(`${baseUrl}/api/products`, {
    method: "POST",
    headers : {
      'Content-type' : 'application/json'
    },
    body:JSON.stringify({name,category,price,description })
  });

  if (!resp.ok) {
    const data = resp.json() ;
    return {message : `API오류 : ${data}`}
  }

  // 캐시를 갱신하여 새데이터 즉시 반영
  revalidatePath('/product')
  //제품목록 페이지로 이동
  redirect('/product')
}

export async function updateProductAction(prevState: FormStatus, formData: FormData): Promise<FormStatus> {
  const id = formData.get('id');
  const name = formData.get('name');
  const category = formData.get('category');
  const price = parseInt(String(formData.get('price')?? '0'));
  const description = formData.get('description');

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const resp = await fetch(`${baseUrl}/api/products/${id}`, {
    method: "PUT",
    headers : {
      'Content-type' : 'application/json'
    },
    body:JSON.stringify({name,category,price,description })
  });

  if (!resp.ok) {
    const data = resp.json() ;
    return {message : `API오류 : ${data}`}
  }

  // 캐시를 갱신하여 새데이터 즉시 반영
  revalidatePath('/product')
  revalidatePath(`/product/${id}`)
  //제품목록 페이지로 이동
  redirect(`/product/${id}`)
}



export async function deleteProductAction(id:string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const resp = await fetch(`${baseUrl}/api/products/${id}`, {
    method: "DELETE"
  });

  if (!resp.ok) {
    const data = resp.json() ;
    return {message : `API오류 : ${data}`}
  }

  // 캐시를 갱신하여 새데이터 즉시 반영
  revalidatePath('/product')  
  //제품목록 페이지로 이동
  redirect('/product')
}

