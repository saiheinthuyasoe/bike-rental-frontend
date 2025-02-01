// app/api/rentals/return/route.ts
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const body = await req.json();
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/rentals/${body.rentalId}/return`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: req.headers.get("Authorization") || "",
    },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  return NextResponse.json({ message: text }, { status: res.status });
}
