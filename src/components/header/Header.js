import React from "react";
import "./Header.css";

const Header = () => {
    return (
        <div className="header d-flex">
            <h3>Star DB</h3>
            <ul className="d-flex">
                <li>
                    <a href="#">People</a>
                </li>
                <li>
                    <a href="#">Planets</a>
                </li>
                <li>
                    <a href="#">StarShips</a>
                </li>
            </ul>
        </div>
    );
};

export default Header;
