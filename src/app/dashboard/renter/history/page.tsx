"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";  // Using next/navigation instead of next/router for App Router

export default function RentalHistory() {
  const [rentals, setRentals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchRentalHistory() {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User not authenticated");
        setLoading(false);
        router.push("/login");  // Redirect to login if not authenticated
        return;
      }

      try {
        const res = await fetch("http://localhost:8080/api/rentals", {
          headers: {
            Authorization: `Bearer ${token.trim()}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch rental history");

        const data = await res.json();
        setRentals(data);
      } catch (err) {
        setError("Error fetching rental history");
      } finally {
        setLoading(false);
      }
    }

    fetchRentalHistory();
  }, [router]);  // Ensure router is passed as a dependency for useEffect

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Your Rental History</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul className="mt-4 space-y-4">
        {rentals.length === 0 && !loading && <p>No rentals found.</p>}
        {rentals.map((rental) => (
          <li key={rental.id} className="border p-4 rounded">
            <p className="font-semibold">Bike: {rental.bike.name}</p>
            <p>Rented On: {new Date(rental.startDate).toLocaleString()}</p>
            <p>Return Date: {new Date(rental.endDate).toLocaleString()}</p>
            <p>Cost: ${rental.cost}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
