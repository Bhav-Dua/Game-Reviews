import React, { useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { UserContext } from "./App";

function GameList({ games }) {
  const history = useHistory();
  const { user } = useContext(UserContext);

  function handleAddGame() {
    history.push("/addgame");
  }

  function handleMyGames() {
    history.push("/mygames");
  }

  return (
    <div className="GameList">
      {user ? (
        <div className="ui buttons" style={{ marginBottom: "3rem" }}>
          <button className="ui button" onClick={handleAddGame}>
            Add Game
          </button>
          <button className="ui button" onClick={handleMyGames}>
            My Games
          </button>
        </div>
      ) : (
        <></>
      )}
      <div className="ui cards">
        {games.map((game) => (
          <div key={game.id} className="ui card">
            <div className="image">
              <img src={game.game_img} alt={game.title} />
            </div>
            <div className="content">
              <a className="header" href={`/games/${game.id}`}>
                {game.title}
              </a>
              <h5>Publisher: {game.publisher}</h5>
              {game.release_year ? (
                <div className="description">
                  Released in {game.release_year}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameList;
