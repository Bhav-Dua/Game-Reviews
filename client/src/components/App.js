import React, { useEffect, useState, createContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import NavBar from './NavBar';
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm';

export const UserContext = createContext();

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/me")
      .then(r => {
        if (r.ok) {
          r.json()
            .then(setUser)
        }
      })
  }, [])

  return (
    <div className="App">
      <UserContext.Provider value={user}>
        <NavBar setUser={setUser}/>
        <Switch>
          <Route path="/login">
            <LoginForm setUser={setUser} />
          </Route>
          <Route path="/signup">
            <SignUpForm setUser={setUser} />
          </Route>
        </Switch>
      </UserContext.Provider>
    </div>
  );
}

export default App;
