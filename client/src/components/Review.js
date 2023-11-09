import React, { useContext, useState } from "react";
import { UserContext } from "./App";

function Review({
  content,
  rating,
  username,
  reviewId,
  userId,
  gameId,
  onDeleteReview,
  onUpdateReview,
}) {
  const { user } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [editedRating, setEditedRating] = useState(rating);
  const [errors, setErrors] = useState([]);

  function handleEdit() {
    setIsEditing(true);
  }

  function handleCancelEdit() {
    setIsEditing(false);
    setEditedContent(content);
    setEditedRating(rating);
    setErrors([]);
  }

  function handleSave() {
    fetch(`/reviews/${reviewId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: editedContent,
        rating: editedRating,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((r) => onUpdateReview(r, gameId));
        setIsEditing(false);
      } else {
        r.json().then((r) => setErrors(r.errors));
      }
    });
  }

  function handleDelete() {
    fetch(`/reviews/${reviewId}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        onDeleteReview(reviewId, gameId);
      } else {
        r.json().then((r) => setErrors(r.errors));
      }
    });
  }

  return (
    <div className="item">
      <div className="content">
        <h3 className="header">{username}</h3>
        {isEditing ? (
          <>
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div>
              Rating:{" "}
              <input
                type="number"
                value={editedRating}
                onChange={(e) => setEditedRating(e.target.value)}
              />
            </div>
          </>
        ) : (
          <>
            <h4 className="description">{content}</h4>
            <div className="rating" style={{ marginTop: "10px" }}>
              Rating: {rating}
            </div>
          </>
        )}
      </div>
      {user && user.id == userId ? (
        <div className="ui buttons">
          {isEditing ? (
            <>
              <div className="ui button" onClick={handleCancelEdit}>
                Cancel
              </div>
              <div className="ui button" onClick={handleSave}>
                Save
              </div>
            </>
          ) : (
            <>
              <div className="ui button" onClick={handleEdit}>
                Edit
              </div>
              <div className="ui button" onClick={handleDelete}>
                Delete
              </div>
            </>
          )}
        </div>
      ) : (
        <></>
      )}
      {errors.map((error) => (
        <p>{error}</p>
      ))}
    </div>
  );
}

export default Review;
