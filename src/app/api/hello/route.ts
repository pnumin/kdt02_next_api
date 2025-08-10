import { NextRequest, NextResponse } from "next/server";

export async function GET(request : NextRequest) {
  return NextResponse.json({msg : "안녕하세요"}) ;
}