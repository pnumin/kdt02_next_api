export const dynamic = 'force-dynamic';

type helloT = {
  msg : string
}

async function getFetchData() :Promise <helloT[]>{
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ;
  const resp = await fetch(`${baseUrl}/api/hello`, {cache : 'no-store'}); 
    
  return await resp.json();
}

export default async function HelloPage() {
  const tdata = await getFetchData()
  return (
    <div className="w-full h-screen
                    flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold">
        {
         tdata && tdata.map((item:helloT) => 
                              <div key={item.msg}>{item.msg}</div>)
        }
      </h1>
    </div>
  );
}