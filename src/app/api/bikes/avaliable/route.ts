// app/api/bikes/available/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/bikes/available`, {
    method: "GET",
  });
  const bikes = await res.json();
  return NextResponse.json(bikes, { status: res.status });
}
