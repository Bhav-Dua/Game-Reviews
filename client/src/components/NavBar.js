import React from "react";
import { Link } from "react-router-dom"

function NavBar() {


    return (
        <div className="NavBar">
            <h1 className="Nav-logo">
                <Link to="/">Games</Link>
            </h1>
        </div>
    )

}

export default NavBar;
