import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./App";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function NavBar() {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  function handleLogout() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) setUser(null);
    });
  }

  function handleLogin() {
    history.push("/login");
  }

  function handleSignup() {
    history.push("/signup");
  }

  return (
    <div className="NavBar">
      <h1 className="Nav-logo">
        <Link to="/">Games</Link>
      </h1>
      {user ? (
        <div className="User-action">
          <p>Hello {user.username}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="User-action">
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleSignup} style={{ marginLeft: "10px" }}>
            Create Account
          </button>
        </div>
      )}
    </div>
  );
}

export default NavBar;
