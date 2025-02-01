// app/dashboard/lender/bikes/page.tsx
"use client";
import { useEffect, useState } from "react";

export default function LenderBikes() {
  const [bikes, setBikes] = useState([]);
  const [newBike, setNewBike] = useState({ name: "", model: "", costPerDay: 0 });

  useEffect(() => {
    fetch("/api/bikes/lender", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => setBikes(data));
  }, []);

  const addBike = async () => {
    const res = await fetch("/api/bikes/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newBike),
    });
    if (res.ok) {
      alert("Bike added successfully!");
      setNewBike({ name: "", model: "", costPerDay: 0 });
      window.location.reload();
    }
  };

  const deleteBike = async (id: number) => {
    await fetch("/api/bikes/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ id }),
    });
    setBikes(bikes.filter((bike: { id: number; name: string; model: string; costPerDay: number }) => bike.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Your Bikes</h1>
      <ul>
        {bikes.map((bike: { id: number; name: string; model: string; costPerDay: number }) => (
          <li key={bike.id} className="border p-4 rounded mb-2">
            <p className="font-semibold">{bike.name} - {bike.model}</p>
            <p>Cost per day: ${bike.costPerDay}</p>
            <button
              onClick={() => deleteBike(bike.id)}
              className="mt-2 bg-red-500 text-white p-2 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-bold mt-6">Add New Bike</h2>
      <input
        type="text"
        placeholder="Bike Name"
        className="border p-2 w-full mt-2"
        value={newBike.name}
        onChange={(e) => setNewBike({ ...newBike, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Model"
        className="border p-2 w-full mt-2"
        value={newBike.model}
        onChange={(e) => setNewBike({ ...newBike, model: e.target.value })}
      />
      <input
        type="number"
        placeholder="Cost Per Day"
        className="border p-2 w-full mt-2"
        value={newBike.costPerDay}
        onChange={(e) => setNewBike({ ...newBike, costPerDay: Number(e.target.value) })}
      />
      <button onClick={addBike} className="mt-4 bg-green-500 text-white p-2 rounded">
        Add Bike
      </button>
    </div>
  );
}
