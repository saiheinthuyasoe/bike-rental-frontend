"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function PendingRentals() {
  const [pendingRentals, setPendingRentals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPendingRentals() {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:8080/api/rentals", {
          headers: {
            Authorization: `Bearer ${token.trim()}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch pending rentals");

        const data = await res.json();
        setPendingRentals(data);
      } catch (err) {
        setError("Error fetching pending rentals");
      } finally {
        setLoading(false);
      }
    }

    fetchPendingRentals();
  }, []);

  const payRental = async (rentalId: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("User not authenticated");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/api/rentals/${rentalId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token.trim()}`,
        },
      });

      if (!res.ok) throw new Error("Error paying rental");

      alert("Rental paid successfully!");
      setPendingRentals((prevRentals) => prevRentals.filter((rental) => rental.id !== rentalId));
    } catch (error: any) {
      alert(error.message || "Error paying rental. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Pending Rentals</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {pendingRentals.map((rental) => (
          <li key={rental.id} className="border p-4 rounded mb-2">
            <p className="font-semibold">Bike Name: {rental.bike.name}</p>
            <p>Duration: {rental.durationInHours} hours</p>
            <p>Total Cost: ${rental.cost}</p>
            <button
              onClick={() => payRental(rental.id)}
              className="mt-2 bg-green-500 text-white p-2 rounded"
            >
              Pay Now
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
