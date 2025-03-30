"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import "./MediaPlayer.css";

export default function MediaPlayer() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [mediaData, setMediaData] = useState({
    mp3Url: "",
    imageUrl: "",
    name: "",
  });

  const [formData, setFormData] = useState({
    mp3Url: "",
    imageUrl: "",
    name: "",
  });

  useEffect(() => {
    if (searchParams) {
      const mp3Url = searchParams.get("mp3Url") || "";
      const imageUrl = searchParams.get("imageUrl") || "";
      const name = searchParams.get("name") || "";

      setMediaData({ mp3Url, imageUrl, name });

      if (mp3Url) {
        setFormData({ mp3Url, imageUrl, name });
      }
    }
  }, [searchParams]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUrl = `/?mp3Url=${encodeURIComponent(
      formData.mp3Url
    )}&imageUrl=${encodeURIComponent(
      formData.imageUrl || ""
    )}&name=${encodeURIComponent(formData.name || "")}`;

    router.push(newUrl);
  };

  const loadExampleMedia = () => {
    const exampleData = {
      mp3Url: "https://media.podeo.co/episodes/MjA0MDk/audio.mp3",
      imageUrl:
        "https://media.podeo.co/podcasts/ODQwOQ/image.jpg?ivc=1699451666",
      name: "الأسلحة الرقمية - من هم مجموعة كيلنت",
    };

    setFormData(exampleData);
  };

  return (
    <div className="media-container">
      <div className="media-form-container">
        <h2>Media Player</h2>
        <form onSubmit={handleSubmit} className="media-form">
          <div className="form-group">
            <label htmlFor="mp3Url">MP3 URL *</label>
            <input
              type="url"
              id="mp3Url"
              name="mp3Url"
              value={formData.mp3Url}
              onChange={handleInputChange}
              placeholder="https://example.com/audio.mp3"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl">Image URL</label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Track Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Track Name"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-play-media">
              Play Media
            </button>
            <button
              type="button"
              className="btn-example"
              onClick={loadExampleMedia}
            >
              Load Example
            </button>
          </div>
        </form>
      </div>

      {mediaData.mp3Url ? (
        <div className="media-player">
          <div className="media-image">
            {mediaData.imageUrl ? (
              <img src={mediaData.imageUrl} alt={mediaData.name} />
            ) : (
              <div className="placeholder">No Image</div>
            )}
          </div>

          <div className="media-info">
            <h2>{mediaData.name || "Untitled Media"}</h2>
          </div>

          <div className="audio-player">
            <audio controls src={mediaData.mp3Url}>
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      ) : (
        <div className="no-media">
          <p>
            Enter media details above and click "Play Media" to start playback
          </p>
        </div>
      )}
    </div>
  );
}
