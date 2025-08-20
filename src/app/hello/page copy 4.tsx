'use client'
import { useState, useEffect } from "react";
type helloT = {
  msg : string
}

export default function HelloPage() {
  const [tdata, setTdata] = useState<helloT[] | null >(null);
  const getFetchData = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    const resp = await fetch(`${baseUrl}/api/hello`) ;
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