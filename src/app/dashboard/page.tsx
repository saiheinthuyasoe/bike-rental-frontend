// app/dashboard/page.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/authStore";

export default function DashboardRedirect() {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      // Redirect based on role
      if (user.role === "ADMIN") router.push("/dashboard/admin");
      else if (user.role === "LENDER") router.push("/dashboard/lender");
      else if (user.role === "RENTER") router.push("/dashboard/renter");
      else router.push("/login");
    }
  }, [user, router]);

  return <div>Loading...</div>;
}
