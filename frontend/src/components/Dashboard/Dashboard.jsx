"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import LinkTable from "../LinkTable/LinkTable";
import "./Dashboard.css";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { currentTheme, changeTheme } = useTheme();
  const [formData, setFormData] = useState({
    mp3Url: "",
    imageUrl: "",
    name: "",
  });
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLinks = () => {
      try {
        setLoading(true);
        const savedLinks = localStorage.getItem("mediaLinks");
        if (savedLinks) {
          setLinks(JSON.parse(savedLinks));
        }
      } catch (err) {
        console.error("Error loading links from localStorage:", err);
        setError("Failed to load links");
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.mp3Url || !formData.name) {
      setError("MP3 URL and Name are required");
      return;
    }

    try {
      setLoading(true);

      const newLink = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString(),
      };

      const updatedLinks = [...links, newLink];
      setLinks(updatedLinks);

      localStorage.setItem("mediaLinks", JSON.stringify(updatedLinks));

      const shareableUrl = `${
        window.location.origin
      }/?mp3Url=${encodeURIComponent(
        formData.mp3Url
      )}&imageUrl=${encodeURIComponent(
        formData.imageUrl || ""
      )}&name=${encodeURIComponent(formData.name)}`;

      navigator.clipboard
        .writeText(shareableUrl)
        .then(() => {
          alert("Shareable link copied to clipboard!");
        })
        .catch((err) => {
          console.error("Could not copy link: ", err);
          alert("Failed to copy to clipboard. The link is: " + shareableUrl);
        });

      setFormData({
        mp3Url: "",
        imageUrl: "",
        name: "",
      });
    } catch (err) {
      console.error("Error creating link:", err);
      setError("Failed to create link");
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteLink = (id) => {
    try {
      const updatedLinks = links.filter((link) => link.id !== id);

      setLinks(updatedLinks);

      localStorage.setItem("mediaLinks", JSON.stringify(updatedLinks));
    } catch (err) {
      console.error("Error deleting link:", err);
      alert("Failed to delete link");
    }
  };
  const handleCopyLink = (link) => {
    const shareableUrl = `${
      window.location.origin
    }/?mp3Url=${encodeURIComponent(link.mp3Url)}&imageUrl=${encodeURIComponent(
      link.imageUrl || ""
    )}&name=${encodeURIComponent(link.name)}`;

    navigator.clipboard
      .writeText(shareableUrl)
      .then(() => {
        alert("Shareable link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Could not copy link: ", err);
        alert("Failed to copy to clipboard. The link is: " + shareableUrl);
      });
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="container">
          <h1>Media Dashboard</h1>
          <div className="user-controls">
            <div className="theme-selector">
              <label htmlFor="theme-select">Theme:</label>
              <select
                id="theme-select"
                value={currentTheme}
                onChange={(e) => changeTheme(e.target.value)}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
            <div className="user-info">
              <span>Welcome, {user?.username || "User"}</span>
              <button onClick={logout} className="btn-logout">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="dashboard-content">
        <div className="container">
          <section className="create-link-section">
            <h2>Create Shareable Media Link</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit} className="create-link-form">
              <div className="form-group">
                <label htmlFor="mp3Url">MP3 URL *</label>
                <input
                  type="url"
                  id="mp3Url"
                  name="mp3Url"
                  value={formData.mp3Url}
                  onChange={handleChange}
                  required
                  placeholder="https://example.com/audio.mp3"
                />
              </div>

              <div className="form-group">
                <label htmlFor="imageUrl">Image URL</label>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Track Name"
                />
              </div>

              <button type="submit" className="btn-create" disabled={loading}>
                {loading ? "Creating..." : "Create Link"}
              </button>
            </form>
          </section>

          <section className="links-section">
            <h2>Your Media Links</h2>
            {loading ? (
              <div className="loading">Loading links...</div>
            ) : (
              <LinkTable
                links={links}
                onDelete={handleDeleteLink}
                onCopy={handleCopyLink}
              />
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
