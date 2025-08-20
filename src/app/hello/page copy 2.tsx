'use client'
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
type helloT = {
  msg : string
}

export default function HelloPage() {
  const [tdata, setTdata] = useState<helloT[] | null >(null);
  const searchParams = useSearchParams() ;
  const msg = searchParams.get('msg') ;
  console.log(msg)

  const getFetchData = async () => {
    const resp = await fetch('http://localhost:3000/api/hello') ;
    const data = await resp.json();
    setTdata(data);
  }

  useEffect(() =>{
    getFetchData()
  }, []);

  useEffect(() => {
    console.log(tdata);
  }, [tdata]);
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