import { NextRequest, NextResponse } from "next/server";
import type { Product } from "@/types/product";

//CRUD를 구현할 JSON 파일 접근을 위해 필요한 모듈 추가
import path from "path";
import { promises as fs } from "fs";

//CRUD를 구현할 JSON 파일의 경로 만들기
const dataPath = path.join(process.cwd() , 'src/app/data/products.json') ;

//데이터 조회
export async function GET(request : NextRequest) {
  try {
    //src/app/data/products.json 파일을 불러오기
    const jsonData = await fs.readFile(dataPath, 'utf-8');

    //불로온 파일을 JSON 파싱을 통해 Product 배열로 만들기
    const products : Product[] = JSON.parse(jsonData) ;

    //URL의 쿼리 스트링 체크해서 category 키값을 가지고 옴 
    const { searchParams } = new URL(request.url) ;
    const category = searchParams.get('category') ;

    //URL의 쿼리 스트링에 category 값이 있는 경우는 해당하는 category값만 조회
    if (category) {
      const cProducts = products.filter(item => item.category === category) ;
      return NextResponse.json(cProducts) ;
    }

    //터미널 콘솔에 출력 
    //console.log(products)
    return NextResponse.json(products) ;
  } catch(error){
    console.error("파일 불러오기 오류 :", error)
    return NextResponse.json({message: "시스템오류"}, {status : 500})
  } ;
}

//파일 추가 
export async function POST(request : NextRequest) {
  try{
    //src/app/data/products.json 파일을 불러오기
    const jsonData = await fs.readFile(dataPath, 'utf-8');
    //불로온 파일을 JSON 파싱을 통해 Product 배열로 만들기
    //현재 등록된 상품 목록
    const products : Product[] = JSON.parse(jsonData) ;

    //요청시 전달한 json 자료가져오기
    const {name, category, price, description} = await request.json() ;

    //추가될 자료의 ID 생성
    const newId = Date.now().toString() ;

    //추가될 상품 오브젝트를 생성
    const newProduct : Product = {
      id : newId ,
      name, 
      category, 
      price, 
      description
    }

    //전체 상품 목록배열에 추가 상품 추가
    products.push(newProduct)

    //src/app/data/products.json에 쓰기
    await fs.writeFile(dataPath, JSON.stringify(products, null, 2))

    return NextResponse.json(newProduct)
  } catch(error){
    console.error("파일 추가오류:", error)
    return NextResponse.json({message: "요청오류"}, {status : 400})
  } ;
}