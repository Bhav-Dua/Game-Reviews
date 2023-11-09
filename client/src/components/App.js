import "semantic-ui-css/semantic.min.css";
import React, { useEffect, useState, createContext } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import NavBar from "./NavBar";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import GameList from "./GameList";
import CreateGameForm from "./CreateGameForm";
import GamePage from "./GamePage";
import MyGames from "./MyGames";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then(setUser);
      }
    });
  }, []);

  useEffect(() => {
    fetch("/games")
      .then((r) => r.json())
      .then(setGames);
  }, []);

  function addGame(newGame) {
    setGames([...games, newGame]);
  }

  function deleteReview(deletedReviewId, gameId) {
    const updatedGames = games.map((game) => {
      if (game.id === gameId) {
        game.reviews = game.reviews.filter((review) => review.id !== deletedReviewId)
      }
      return game;
    })
    setGames(updatedGames);
  }

  function updateReview(updatedReview, gameId) {
    const updatedGames = games.map((game) => {
      if (game.id === gameId) {
        game.reviews = game.reviews.map((review) => {
          if (review.id === updatedReview.id) {
            return updatedReview
          }
          else return review
        })
      }
      return game;
    })
    setGames(updatedGames)
  }

  function addReview(newReview, gameId) {
    const updatedGames = games.map((game) => {
      if (game.id === gameId) {
        game.reviews.push(newReview);
      }
      return game
    })
    setGames(updatedGames);
  }

  return (
    <div className="App">
      <UserContext.Provider value={{user, setUser}}>
        <NavBar />
        <Switch>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/signup">
            <SignUpForm />
          </Route>
          <Route path="/addgame">
            <CreateGameForm onCreateGame={addGame} />
          </Route>
          <Route path="/games/:id">
            <GamePage games={games} onDeleteReview={deleteReview} onUpdateReview={updateReview} onAddReview={addReview} />
          </Route>
          <Route path="/mygames">
            <MyGames />
          </Route>
          <Route exact path="/">
            <GameList games={games} />
          </Route>
        </Switch>
      </UserContext.Provider>
    </div>
  );
}

export default App;
