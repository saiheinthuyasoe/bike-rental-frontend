"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../lib/api";

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    role: "ADMIN", // default role; can be changed via the select dropdown
  });
  const [secretCode, setSecretCode] = useState("");

  // Async handleSubmit function
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Build the URL with query params if role is ADMIN
    let url = "/auth/register";
    if (form.role === "ADMIN") {
      url += `?secretCode=${encodeURIComponent(secretCode)}`;
    }

    try {
      // Send a POST request to your backend registration endpoint
      const response = await api.post(url, form);
      alert("Registration successful!");
      router.push("/login");
    } catch (error: any) {
      console.error("Registration failed", error.response?.data || error.message);
      alert(
        "Registration failed: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="border p-2 w-full mb-4"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className="border p-2 w-full mb-4"
          required
        />

        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
          className="border p-2 w-full mb-4"
          required
        />

        <input
          type="text"
          placeholder="Address"
          value={form.address}
          onChange={(e) =>
            setForm({ ...form, address: e.target.value })
          }
          className="border p-2 w-full mb-4"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          className="border p-2 w-full mb-4"
          required
        />

        <select
          className="border p-2 w-full mb-4"
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        >
          <option value="ADMIN">Admin</option>
          <option value="RENTER">Renter</option>
          <option value="LENDER">Lender</option>
          {/* Add more roles if needed */}
        </select>

        {form.role === "ADMIN" && (
          <input
            type="text"
            placeholder="Admin Secret Code"
            value={secretCode}
            onChange={(e) => setSecretCode(e.target.value)}
            className="border p-2 w-full mb-4"
            required
          />
        )}

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
}
