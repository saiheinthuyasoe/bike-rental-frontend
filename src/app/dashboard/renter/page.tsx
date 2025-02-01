// app/dashboard/renter/page.tsx
"use client";
import Link from "next/link";

export default function RenterDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Renter Dashboard</h1>
      <p>Welcome, Renter!</p>
      <nav className="mt-4">
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard/renter/bikes" className="text-blue-500 underline">
              View Available Bikes
            </Link>
          </li>
          <li>
            <Link href="/dashboard/renter/history" className="text-blue-500 underline">
              Your Rental History
            </Link>
          </li>
          <li>
            <Link href="/dashboard/renter/pending" className="text-blue-500 underline">
              Your Bike Pending
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
