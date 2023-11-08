import React, { useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import Review from "./Review";
import { UserContext } from "./App";

function GamePage({ games, onDeleteReview, onUpdateReview, onAddReview }) {
  const user = useContext(UserContext);
  const history = useHistory();
  const { id } = useParams();
  const gameToDisplay = games.find((game) => game.id == id);
  const [isAdding, setisAdding] = useState(false);
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [errors, setErrors] = useState([]);

  if (!gameToDisplay) return <div>Game not found</div>;

  const reviewsToDisplay = gameToDisplay.reviews.map((review) => (
    <Review
      key={review.id}
      content={review.content}
      rating={review.rating}
      username={review.username}
      reviewId={review.id}
      userId={review.user_id}
      gameId={gameToDisplay.id}
      onDeleteReview={onDeleteReview}
      onUpdateReview={onUpdateReview}
    />
  ));

  function handleAddReview() {
    if (!user) {
      history.push("/login")
    }
    else {
      setisAdding(true);
    }
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    fetch("/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content: reviewContent,
        rating: reviewRating,
        game_id: gameToDisplay.id
      })
    })
      .then(r => {
        if (r.ok) {
          r.json().then(r => onAddReview(r, gameToDisplay.id))
          setisAdding(false)
        }
        else {
          r.json().then(r => setErrors(r.errors))
        }
      })
    
  }

  function handleCancelAdd() {
    setisAdding(false);
    setErrors([]);
    setReviewContent("");
    setReviewRating(0);
  }

  return (
    <div className="ui placeholder segment">
      <div class="ui two column very relaxed stackable grid">
      <div className="column">
        {isAdding ? (
          <>
            <form onSubmit={handleSubmit}>
              <div>
              <textarea
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
                placeholder="Write your review..."
              />
              <label htmlFor="rating">Rating: </label>
              <input
                type="number"
                value={reviewRating}
                onChange={(e) => setReviewRating(Number(e.target.value))}
                style={{ width: "100px" }}
              />
              </div>
              <div className="ui buttons">
                <button className="ui button" onClick={handleCancelAdd}>Cancel</button>
              <button className="ui button" type="submit">Submit Review</button>
              </div>
                
            </form>
            {errors.map((error) => (
        <p>{error}</p>
      ))}
            </>
        ) : (
          <>
          <div className="ui vertical menu">{reviewsToDisplay}</div>
          <div style={{ position: "fixed", bottom: "1rem", left: "50%", transform: "translateX(-50%)" }}>
            {user ? (
              <button className="ui button" onClick={handleAddReview}>Add Review</button>
            ) : (
              <div className="ui animated fade button" tabIndex="0" onClick={() => history.push("/login")}>
              <div className="visible content">Add Review</div>
             <div className="hidden content">Sign in</div>
             </div>
            )}
            </div>
            </>
        )}

        </div>
        <div className="middle aligned column">
          hi
        </div>
        </div>
        <div className="ui vertical divider"></div>
    </div>
  )
}

export default GamePage;
