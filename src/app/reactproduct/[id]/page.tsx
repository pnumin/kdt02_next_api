'use client';

import { useState, useEffect, use } from "react";
import type { Product } from "@/types/product";
import Link from "next/link";

export default function ReactProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) { 
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  
  const getProduct = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const resp = await fetch(`${baseUrl}/api/products/${id}`);

    const data: Product = await resp.json();
    setProduct(data);
  };

  useEffect(() => {
    if (!id) return; 
    getProduct();
  }, [id]);

  return (
    <div className="container mx-auto min-h-screen p-5 bg-gray-50 flex justify-center items-center">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">{product && product.name}</h1>
          <Link href="/reactproduct" className="bg-blue-600 text-white p-4 rounded-lg">
            목록으로
          </Link>
        </div>
        <div className="space-y-4 text-lg">
          <div className="text-gray-600">
            <span className="font-bold mr-4 text-gray-800">카테고리:</span>
            <span>{product && product.category}</span>
          </div>
          <div className="text-gray-600">
            <span className="font-bold mr-4 text-gray-800">상세설명:</span>
            <p className="inline">{product && product.description}</p>
          </div>
        </div>
        <div className="text-3xl font-bold text-blue-700 text-right mt-8">
          {product && product.price.toLocaleString()}원
        </div>
      </div>
    </div>
  );
}