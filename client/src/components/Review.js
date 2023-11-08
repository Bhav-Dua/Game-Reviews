import React, { useContext } from "react";
import { UserContext } from "./App";

function Review({ content, rating, username, userId }) {

    const user = useContext(UserContext);

    return (
        <div className="item">
            <div className="content">
                <h3 className="header">{username}</h3>
                <h4 className="description">{content}</h4>
                <div className="rating" style={{marginTop: "10px"}}>Rating: {rating}</div>
            </div>
            {user && user.id == userId ? (
                <div className="buttons">
                    <div className="ui button">Edit</div>
                    <div className="ui button">Delete</div>
                </div>
            ) : (
                <></>
            )}
        </div>
    )
}

export default Review;