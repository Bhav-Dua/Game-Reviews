import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { UserContext } from "./App";

function GamePage({ games }) {

    const user = useContext(UserContext);
    const { id } = useParams();
    const gameToDisplay = games.find((game) => game.id == id)

    if (!gameToDisplay) return <div>Game not found</div>

    const reviewsToDisplay = gameToDisplay.reviews.map((review) => (
        <div className="item">
            <div className="content">
                <h3 className="header">{review.user.username}</h3>
                <h4 className="description">{review.content}</h4>
                <div className="rating" style={{marginTop: "10px"}}>Rating: {review.rating}</div>
            </div>
            {user && user.id == review.user.id ? (
                <div className="buttons">
                    <div className="ui button">Edit</div>
                    <div className="ui button">Delete</div>
                </div>
            ) : (
                <></>
            )}
        </div>
    ))


    return (
        <div className="ui vertical menu">
            {reviewsToDisplay}
        </div>
    )
}

export default GamePage;