"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import "./Navigation.css";

export default function Navigation() {
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="main-nav">
      <div className="container nav-container">
        <div className="logo">
          <Link href="/">Podeo Media Player</Link>
        </div>
        <ul className="nav-links">
          <li className={pathname === "/" ? "active" : ""}>
            <Link href="/">Home</Link>
          </li>
          {isAuthenticated ? (
            <>
              <li className={pathname === "/dashboard" ? "active" : ""}>
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button onClick={logout} className="nav-btn">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className={pathname === "/login" ? "active" : ""}>
              <Link href="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
