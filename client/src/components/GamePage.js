import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Review from "./Review";

function GamePage({ games }) {
  const { id } = useParams();
  const gameToDisplay = games.find((game) => game.id == id);

  if (!gameToDisplay) return <div>Game not found</div>;

  const reviewsToDisplay = gameToDisplay.reviews.map((review, index) => (
    <Review
      key={index}
      content={review.content}
      rating={review.rating}
      username={review.user.username}
      userId={review.user.id}
    />
  ));

  return <div className="ui vertical menu">{reviewsToDisplay}</div>;
}

export default GamePage;
