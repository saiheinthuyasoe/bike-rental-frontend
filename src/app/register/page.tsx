// app/register/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../lib/api";

export default function Register() {
  const [form, setForm] = useState({ email: "", password: "", role: "RENTER", secretCode: "" });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      alert("Registration successful!");
      router.push("/login");
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-4"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <select
          className="border p-2 w-full mb-4"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          title="Role"
        >
          <option value="RENTER">Renter</option>
          <option value="LENDER">Lender</option>
          <option value="ADMIN">Admin</option>
          {/* Add more roles if needed */}
        </select>
        {form.role === "ADMIN" && (
          <input
            type="text"
            placeholder="Secret Code"
            className="border p-2 w-full mb-4"
            value={form.secretCode}
            onChange={(e) => setForm({ ...form, secretCode: e.target.value })}
          />
        )}
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
