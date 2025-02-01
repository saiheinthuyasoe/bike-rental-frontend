// app/api/rentals/create/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/rentals/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Forward the Authorization header if provided
      Authorization: req.headers.get("Authorization") || "",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
