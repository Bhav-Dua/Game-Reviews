import 'semantic-ui-css/semantic.min.css';
import React, { useEffect, useState, createContext } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import NavBar from "./NavBar";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import GameList from "./GameList";
import CreateGameForm from './CreateGameForm';

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [games, setGames] = useState([])

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
    setGames([
      ...games,
      newGame
    ])
  }

  return (
    <div className="App">
      <UserContext.Provider value={user}>
        <NavBar setUser={setUser} />
        <Switch>
          <Route path="/login">
            <LoginForm setUser={setUser} />
          </Route>
          <Route path="/signup">
            <SignUpForm setUser={setUser} />
          </Route>
          <Route path="/addgame">
            <CreateGameForm onCreateGame={addGame} />
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
