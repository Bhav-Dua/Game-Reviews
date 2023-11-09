import React, { useContext } from "react";
import { UserContext } from "./App";

function MyGames() {
  const { user } = useContext(UserContext);

  if (!user || !user.games.length === 0) return <h2>You have no games</h2>;

  const gamesToDisplay = user.games.map((game) => (
    <div className="item">
      <div className="header">{game.title}</div>
      {game.publisher}
    </div>
  ));

  return (
    <div>
        <h1>My Games</h1>
        <div className="ui very relaxed list" style={{ marginTop: "5rem" }}>{gamesToDisplay}</div>
    </div>
  )
}

export default MyGames;
