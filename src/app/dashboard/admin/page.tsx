"use client";
import { useEffect, useState } from "react";
import { api, authHeaders } from "../../lib/api";

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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users data
        const usersRes = await fetch("http://localhost:8080/api/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        if (!usersRes.ok) throw new Error("Failed to fetch users");

        const usersData = await usersRes.json();
        setUsers(usersData);

        // Fetch bikes data
        const bikesRes = await fetch("http://localhost:8080/api/bikes", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        if (!bikesRes.ok) throw new Error("Failed to fetch bikes");

        const bikesData = await bikesRes.json();
        setBikes(bikesData);
      } catch (err) {
        console.error("Fetch error:", err.message);
        setError("Error fetching data");
      }
    };

    fetchData();
  }, []);

  const deleteUser = async (id: number) => {
    try {
      await api.delete(`/users/${id}`, authHeaders());
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err: any) {
      console.error("Error deleting user:", err);
      setError(err.response?.data?.message || "Failed to delete user");
    }
  };

  const deleteBike = async (id: number) => {
    try {
      await api.delete(`/bikes/${id}`, authHeaders());
      setBikes((prev) => prev.filter((bike) => bike.id !== id));
    } catch (err: any) {
      console.error("Error deleting bike:", err);
      setError(err.response?.data?.message || "Failed to delete bike");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-indigo-600 text-white py-6 px-4 shadow-md">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </header>

      <main className="p-6">
        {error && (
          <div className="mb-4 p-4 bg-red-200 text-red-800 rounded">
            <p>Error: {error}</p>
          </div>
        )}

        {/* Manage Users Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2 border-gray-300">
            Manage Users
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300"
              >
                <p className="text-lg font-medium text-gray-800">{user.email}</p>
                <p className="text-sm text-gray-600 mb-4">{user.role}</p>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-300"
                >
                  Delete User
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Manage Bikes Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2 border-gray-300">
            Manage Bikes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {bikes.map((bike) => (
              <div
                key={bike.id}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300"
              >
                <p className="text-lg font-medium text-gray-800">{bike.name}</p>
                <p className="text-sm text-gray-600 mb-4">{bike.model}</p>
                <button
                  onClick={() => deleteBike(bike.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-300"
                >
                  Delete Bike
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
