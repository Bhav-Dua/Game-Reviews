import React, { useEffect, useState } from 'react';
import './App.css';
import NavBar from './NavBar';

const UserContext = React.createContext();

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
        <NavBar />
      </UserContext.Provider>
    </div>
  );
}

export default App;
