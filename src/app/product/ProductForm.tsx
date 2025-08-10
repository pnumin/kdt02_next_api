'use client'
import type { Product } from "@/types/product";
import { useActionState } from "react";
import type { FormStatus } from "../actions";
import { createProductAction, updateProductAction } from "../actions";
import SubmitButton from "./SubmitButton";

interface ProductFormProps {
  //product가 있으면 수정모드 없으면 입력모드
  product?: Product;
}

export default function ProductForm({ product }: ProductFormProps) {
  const isEditMode = product != null;

  //useActionstate 설정
  const actionUse = isEditMode ? updateProductAction : createProductAction ;
  const initState : FormStatus = { message : ''} ;
  const [state, formAction] = useActionState( actionUse, initState) ;

  return (
    <div className="w-full bg-white p-8 rounded-lg shadow-md">
      <form action={formAction} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {isEditMode && <input type="hidden" name="id" value={product.id} />}
        <div className="p-4">
          <label htmlFor="name"
            className="text-gray-900 mr-2">제품명</label>
          <input type="text"
            id="name"
            name="name"
            required
            defaultValue={isEditMode ? product.name : ""}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md" />
        </div>
        <div className="p-4">
          <label htmlFor="category"
            className="text-gray-900 mr-2">카테고리</label>
          <input type="text"
            id="category"
            name="category"
            required
            defaultValue={isEditMode ? product.category : ""}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md" />
        </div>
        <div className="p-4">
          <label htmlFor="price"
            className="text-gray-900 mr-2">가격</label>
          <input type="text"
            id="price"
            name="price"
            required
            defaultValue={isEditMode ? product.price : ""}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md" />
        </div>
        <div className="p-4">
          <label htmlFor="description"
            className="text-gray-900 mr-2">설명</label>
          <input type="text"
            id="description"
            name="description"
            required
            defaultValue={isEditMode ? product.description : ""}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md" />
        </div>
        <div className="w-full text-right md:col-span-2 lg:col-span-4">
          <SubmitButton isEditMode={isEditMode} />
        </div>
      </form>
    </div>
  );
}
