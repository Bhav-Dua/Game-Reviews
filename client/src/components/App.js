import React, { useEffect, useState, createContext } from 'react';
import './App.css';
import NavBar from './NavBar';

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
      </UserContext.Provider>
    </div>
  );
}

export default App;
