"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Dashboard from "@/components/Dashboard/Dashboard";
import Navigation from "@/components/Navigation/Navigation";

export default function DashboardPage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Navigation />
      <Dashboard />
    </>
  );
}
