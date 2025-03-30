"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import "./Login.css";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.username || !formData.password) {
      setError("Username and password are required");
      setLoading(false);
      return;
    }

    try {
      // For the demo i'll accept predefined credentials
      if (formData.username === "admin" && formData.password === "password") {
        login({ username: formData.username }, "fake-token-12345");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError(err.message || "Login failed");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="login-info">
          <p>For testing, use:</p>
          <p>Username: admin</p>
          <p>Password: password</p>
        </div>
      </div>
    </div>
  );
}
