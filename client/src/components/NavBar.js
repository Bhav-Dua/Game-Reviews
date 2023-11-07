import React, { useContext } from "react";
import { Link } from "react-router-dom"
import { UserContext } from "./App"

function NavBar({ setUser }) {

    const user = useContext(UserContext);

    function handleLogout() {
        fetch("/logout", { method: "DELETE" })
            .then(r => {
                if (r.ok)
                setUser(null);
            })
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
                <Link className="User-action" to="/login">Login</Link>
            )}
        </div>
    )

}

export default NavBar;
