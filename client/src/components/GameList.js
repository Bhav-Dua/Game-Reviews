import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function GameList({ games }) {
  const history = useHistory();

  function handleAddGame() {
    history.push("/addgame");
  }

  return (
    <div className="GameList">
      <button className="AddGame" onClick={handleAddGame}>
        Add Game
      </button>
      <div className="ui cards">
        {games.map((game) => (
          <div key={game.id} className="ui card">
            <div className="image">
              <img src={game.game_img} alt={game.title} />
            </div>
            <div className="content">
              <a className="header">{game.title}</a>
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
