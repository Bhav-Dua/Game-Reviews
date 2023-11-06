import React, { useEffect, useState } from 'react';
import './App.css';

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
  })




  return (
    <div className="App">
      <UserContext.Provider value={user}>
      </UserContext.Provider>
    </div>
  );
}

export default App;
