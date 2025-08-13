import type { Product } from "@/types/product";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({product}:ProductCardProps) {
  return (
    <div className="border border-gray-400 p-4 rounded-lg">
      <h2 className="text-2xl font-bold my-4">
        <Link href={`/reactproduct/${product.id}`}>
          {product.name}
        </Link> 
      </h2>
      <p className="text-gray-500">
        {product.description}
      </p>
      <p className="text-2xl font-bold text-blue-700 text-right">
        {product.price.toLocaleString()} 원
      </p>
    </div>
  );
}