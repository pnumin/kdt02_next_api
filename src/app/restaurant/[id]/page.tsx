import type { restaurant } from '@/types/restaurant';
import RestaurantDetail from '@/components/RestaurantDetail';

async function getRestaurantById(id: string): Promise<restaurant | null> {
  const apikey = process.env.NEXT_PUBLIC_API;
  const url = `https://apis.data.go.kr/6260000/FoodService/getFoodKr?serviceKey=${apikey}&pageNo=1&numOfRows=100&resultType=json`;
  const resp = await fetch(url, { next: { revalidate: 3600 } }); // Revalidate every hour
  const data = await resp.json();
  
  const tdata: restaurant[] = data.getFoodKr.item;
  return tdata.find(item => item.UC_SEQ === parseInt(id)) || null;

}

export default async function RestaurantIdPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const restaurant = await getRestaurantById(id);
  return (
    <RestaurantDetail restaurant={restaurant} />
  );
}
