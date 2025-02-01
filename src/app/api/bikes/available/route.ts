import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/bikes/available`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${req.headers.get("Authorization") || ""}`, // Pass token if required
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch bikes: ${res.statusText}`);
    }

    const bikes = await res.json();
    return NextResponse.json(bikes, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch bikes" }, { status: 500 });
  }
}
