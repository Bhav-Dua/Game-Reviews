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
}) {
  const user = useContext(UserContext);
  const [errors, setErrors] = useState([]);

  function handleEdit() {}

  function handleDelete() {
    fetch(`/reviews/${reviewId}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        onDeleteReview(reviewId, gameId);
      } else {
      }
    });
  }

  return (
    <div className="item">
      <div className="content">
        <h3 className="header">{username}</h3>
        <h4 className="description">{content}</h4>
        <div className="rating" style={{ marginTop: "10px" }}>
          Rating: {rating}
        </div>
      </div>
      {user && user.id == userId ? (
        <div className="buttons">
          <div className="ui button" onClick={handleEdit}>
            Edit
          </div>
          <div className="ui button" onClick={handleDelete}>
            Delete
          </div>
        </div>
      ) : (
        <>
          {errors.map((error) => (
            <p>{error}</p>
          ))}
        </>
      )}
    </div>
  );
}

export default Review;
