// app/dashboard/lender/page.tsx
"use client";
import Link from "next/link";

export default function LenderDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Lender Dashboard</h1>
      <p>Welcome, Lender!</p>
      <nav className="mt-4">
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard/lender/bikes" className="text-blue-500 underline">
              Manage Your Bikes
            </Link>
          </li>
          {/* Additional lender links can be added here */}
        </ul>
      </nav>
    </div>
  );
}
