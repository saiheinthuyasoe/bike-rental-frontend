"use client";
import { useEffect, useState } from "react";

export default function RenterBikes() {
  const [bikes, setBikes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBikes() {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:8080/api/bikes/available", {
          headers: {
            Authorization: `Bearer ${token.trim()}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch bikes");

        const data = await res.json();
        setBikes(data);
      } catch (err) {
        setError("Error fetching bikes");
      } finally {
        setLoading(false);
      }
    }

    fetchBikes();
  }, []);

  const rentBike = async (bikeId: number, pricePerHour: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("User not authenticated");
      return;
    }

    // Prompt the user for rental duration (in hours)
    const durationInHours = prompt("Enter rental duration in hours:");
    if (!durationInHours || isNaN(Number(durationInHours)) || Number(durationInHours) <= 0) {
      alert("Invalid duration entered. Please enter a positive number.");
      return;
    }

    const cost = pricePerHour * Number(durationInHours);

    try {
      const res = await fetch("http://localhost:8080/api/rentals/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.trim()}`,
        },
        body: JSON.stringify({
          bikeId,
          renterId: 5, // Assuming the renterId is fixed, replace with dynamic value if needed
          durationInHours: Number(durationInHours),
          cost,
        }),
      });

      if (!res.ok) throw new Error("Error renting bike");

      alert("Bike rented successfully!");
      setBikes((prevBikes) => prevBikes.filter((bike) => bike.id !== bikeId));
    } catch (error: any) {
      alert(error.message || "Error renting bike. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Available Bikes</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {bikes.map((bike) => (
          <li key={bike.id} className="border p-4 rounded mb-2">
            <p className="font-semibold">{bike.name}</p>
            <p>Model: {bike.model}</p>
            <p>Price per hour: ${bike.pricePerHour}</p>
            <button
              onClick={() => rentBike(bike.id, bike.pricePerHour)}
              className="mt-2 bg-blue-500 text-white p-2 rounded"
            >
              Rent Now
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
