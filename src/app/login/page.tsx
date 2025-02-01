"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/authStore";
import { api } from "../lib/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response: { data: { token: string; role?: string } } = await api.post("/auth/login", { email, password });
      console.log("API response:", response.data);
      
      // Retrieve token and role from the response
      const token = response.data.token ? response.data.token : response.data;
      // This will default to "USER" if role is missing.
      const role: string = response.data.role || "";

      console.log("Extracted role:", role);

      if (typeof token !== "string" || token.trim() === "") {
        throw new Error("Invalid token received");
      }

      // Save token and role in local storage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role.toUpperCase()); // Ensure uppercase for consistency

      // Update auth store if necessary
      login(token);
      
      // Redirect based on role
      if (role.toUpperCase() === "ADMIN") {
        router.push("/dashboard/admin");
      } else if (role.toUpperCase() === "LENDER") {
        router.push("/dashboard/lender");
      } else if (role.toUpperCase() === "RENTER") {
        router.push("/dashboard/renter");
      } else {
        router.push("/dashboard");
      }
    } catch (error: any) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Login failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
