// app/dashboard/admin/page.tsx
"use client";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  interface User {
    id: number;
    email: string;
    role: string;
  }

  interface Bike {
    id: number;
    name: string;
    model: string;
  }

  const [users, setUsers] = useState<User[]>([]);
  const [bikes, setBikes] = useState<Bike[]>([]);

  useEffect(() => {
    // Fetch all users
    fetch("/api/users", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data));

    // Fetch all bikes
    fetch("/api/bikes", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => setBikes(data));
  }, []);

  const deleteUser = async (id: number) => {
    await fetch(`/api/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setUsers(users.filter((u) => u.id !== id));
  };

  const deleteBike = async (id: number) => {
    await fetch(`/api/bikes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setBikes(bikes.filter((b) => b.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <h2 className="text-xl font-bold mt-6">Manage Users</h2>
      <ul>
        {users.map((user: User) => (
          <li key={user.id} className="border p-4 rounded mb-2">
            <p>{user.email} - {user.role}</p>
            <button
              onClick={() => deleteUser(user.id)}
              className="mt-2 bg-red-500 text-white p-2 rounded"
            >
              Delete User
            </button>
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-bold mt-6">Manage Bikes</h2>
      <ul>
        {bikes.map((bike: Bike) => (
          <li key={bike.id} className="border p-4 rounded mb-2">
            <p>{bike.name} - {bike.model}</p>
            <button
              onClick={() => deleteBike(bike.id)}
              className="mt-2 bg-red-500 text-white p-2 rounded"
            >
              Delete Bike
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
