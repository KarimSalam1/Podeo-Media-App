"use client";

import "./LinkTable.css";

export default function LinkTable({ links, onDelete, onCopy }) {
  if (!links || links.length === 0) {
    return <div className="no-links">No media links created yet</div>;
  }

  return (
    <div className="link-table-container">
      <table className="link-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>MP3 URL</th>
            <th>Image</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => (
            <tr key={link.id}>
              <td>{link.name}</td>
              <td className="url-cell">
                <div className="truncate">{link.mp3Url}</div>
              </td>
              <td className="image-cell">
                {link.imageUrl ? (
                  <div className="thumbnail">
                    <img src={link.imageUrl} alt={link.name} />
                  </div>
                ) : (
                  <span>No image</span>
                )}
              </td>
              <td>{new Date(link.createdAt).toLocaleDateString()}</td>
              <td className="actions-cell">
                <button
                  onClick={() =>
                    window.open(
                      `/?mp3Url=${encodeURIComponent(
                        link.mp3Url
                      )}&imageUrl=${encodeURIComponent(
                        link.imageUrl || ""
                      )}&name=${encodeURIComponent(link.name)}`,
                      "_blank"
                    )
                  }
                  className="btn-action btn-play"
                  title="Play media"
                >
                  Play
                </button>
                <button
                  onClick={() => onCopy(link)}
                  className="btn-action btn-copy"
                  title="Copy link to clipboard"
                >
                  Copy Link
                </button>
                <button
                  onClick={() => onDelete(link.id)}
                  className="btn-action btn-delete"
                  title="Delete link"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
