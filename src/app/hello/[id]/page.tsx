import { supabase } from "@/lib/supabase/client";
export default async function HelloId({
  params
} : {
  params : Promise<{id : string}>
}) {

  const { id } = await params ;
  const {data , error} = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
  
  return (
    <div className="w-full h-screen
                    flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold">
        [{data.id}]{data.name}
      </h1>
      <ul className="text-xl">
        <li>{data.category}</li>
        <li>{data.price}</li>
        <li>{data.description}</li>
      </ul>
    </div>
  );
}