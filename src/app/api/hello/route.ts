import { NextRequest, NextResponse } from "next/server";

export async function GET(request : NextRequest) {
  const data = [
    {msg : "안녕하세요"}, 
    {msg:"반갑습니다"},
    {msg:"부산대학교 K-didital"},
  ]
  return NextResponse.json(data) ;
}