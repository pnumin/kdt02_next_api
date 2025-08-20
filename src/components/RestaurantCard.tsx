'use client'
import type { restaurant } from "@/types/restaurant";
import Link from "next/link";
interface RestaurantCardProps {
  restaurant: restaurant  
}

// 맛집 정보를 표시하는 카드 컴포넌트
export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  console.log("RestaurantCard", restaurant);
  return (
    <Link href={`/restaurant/${restaurant.UC_SEQ}`} className="block group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col transition-transform group-hover:scale-105 duration-300">
        <div className="w-full h-48 bg-amber-100 flex-shrink-0">
          <img
            src={restaurant.MAIN_IMG_THUMB ? restaurant.MAIN_IMG_THUMB : '/noimg.png'}
            alt={restaurant.MAIN_TITLE}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="text-lg font-semibold truncate" title={restaurant.MAIN_TITLE}>
            {restaurant.MAIN_TITLE}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {restaurant.GUGUN_NM}
          </p>
          <p className="text-sm text-gray-500 mt-2 truncate" 
              title={restaurant.ADDR1}>
            {restaurant.ADDR1}
          </p>
        </div>
      </div>
     </Link>
  );
}
