import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Review from "./Review";

function GamePage({ games, onDeleteReview }) {
  const { id } = useParams();
  const gameToDisplay = games.find((game) => game.id == id);

  if (!gameToDisplay) return <div>Game not found</div>;

  const reviewsToDisplay = gameToDisplay.reviews.map((review) => (
    <Review
      key={review.id}
      content={review.content}
      rating={review.rating}
      username={review.user.username}
      reviewId={review.id}
      userId={review.user.id}
      gameId={gameToDisplay.id}
      onDeleteReview={onDeleteReview}
    />
  ));

  return <div className="ui vertical menu">{reviewsToDisplay}</div>;
}

export default GamePage;
