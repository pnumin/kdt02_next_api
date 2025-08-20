'use client';
import { useState, useEffect } from "react";
import type { restaurant } from "@/types/restaurant";
import RestaurantCard from "@/components/RestaurantCard";

export default function () {
  const [tdata, setTdata] = useState<restaurant[]>([]);

  const getFechData = async () => {
    const apikey = process.env.NEXT_PUBLIC_API;
    const url = `https://apis.data.go.kr/6260000/FoodService/getFoodKr?serviceKey=${apikey}&pageNo=1&numOfRows=10&resultType=json`

    const resp = await fetch(url);
    const data = await resp.json();
    setTdata(data.getFoodKr.item);

  }
  useEffect(() => {
    getFechData();
  }, []);

  useEffect(() => {
    console.log(tdata);
  }, [tdata])

  return (
    <div className="w-full h-screen lg:w-4/5 lg:max-w-7xl lg:mx-auto h-full flex flex-col bg-white lg:shadow-xl">
      <div className="flex flex-col gap-8">
        <h2 className="text-2xl font-bold">부산 맛집 리스트</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tdata && tdata.map((item: restaurant) => <RestaurantCard
            key={item.UC_SEQ}
            restaurant={item} />)
          }
        </div>
      </div>
    </div>
  );
}