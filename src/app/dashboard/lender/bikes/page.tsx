"use client";
import { useEffect, useState } from "react";

export default function LenderBikes() {
  const [bikes, setBikes] = useState([]);
  const [newBike, setNewBike] = useState({
    name: "",
    brand: "",
    model: "",
    pricePerHour: 0,
  });

  useEffect(() => {
    fetch("http://localhost:8080/api/bikes", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")?.trim()}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setBikes(data); // If filtering by lender is needed, do it here
      })
      .catch((error) => console.error("Error fetching bikes:", error));
  }, []);

  const addBike = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/bikes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")?.trim()}`,
        },
        body: JSON.stringify(newBike),
      });

      if (!res.ok) throw new Error("Failed to add bike");

      alert("Bike added successfully!");
      setNewBike({ name: "", brand: "", model: "", pricePerHour: 0 });
      window.location.reload();
    } catch (error) {
      console.error("Error adding bike:", error);
      alert("Error adding bike. Please try again.");
    }
  };

  const deleteBike = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:8080/api/bikes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")?.trim()}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete bike");

      setBikes(bikes.filter((bike: { id: number }) => bike.id !== id));
      alert("Bike deleted successfully!");
    } catch (error) {
      console.error("Error deleting bike:", error);
      alert("Error deleting bike. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Your Bikes</h1>
      <ul>
        {bikes.map(
          (bike: {
            id: number;
            name: string;
            brand: string;
            model: string;
            pricePerHour: number;
          }) => (
            <li key={bike.id} className="border p-4 rounded mb-2">
              <p className="font-semibold">
                {bike.name} ({bike.brand}) - {bike.model}
              </p>
              <p>Price per hour: ${bike.pricePerHour}</p>
              <button
                onClick={() => deleteBike(bike.id)}
                className="mt-2 bg-red-500 text-white p-2 rounded"
              >
                Delete
              </button>
            </li>
          )
        )}
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
        placeholder="Brand"
        className="border p-2 w-full mt-2"
        value={newBike.brand}
        onChange={(e) => setNewBike({ ...newBike, brand: e.target.value })}
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
        placeholder="Price Per Hour"
        className="border p-2 w-full mt-2"
        value={newBike.pricePerHour}
        onChange={(e) =>
          setNewBike({ ...newBike, pricePerHour: Number(e.target.value) })
        }
      />
      <button
        onClick={addBike}
        className="mt-4 bg-green-500 text-white p-2 rounded"
      >
        Add Bike
      </button>
    </div>
  );
}
