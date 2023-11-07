import React from "react";

function GameList({ games }) {

    return (
        <div className="ui-cards">
          {games.map((game, index) => (
            <div key={index} className="ui card">
                <div className="image">
                    <img src={game.game_img} alt={game.title} />
                </div>
                <div className="content">
                    <a className="header">{game.title}</a>
                    <div className="description">Released in {game.release_year}</div>
                </div>
            </div>
          ))}
        </div>
       );

}

export default GameList;