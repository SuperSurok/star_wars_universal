import React from "react";
import "./Header.css";

const Header = () => {
    return (
        <div className="header d-flex">
            <h3>Star DB</h3>
            <ul className="d-flex">
                <li>
                    {/*eslint-disable-next-line*/}
                    <a href="#">People</a>
                </li>
                <li>
                    {/*eslint-disable-next-line*/}
                    <a href="#">Planets</a>
                </li>
                <li>
                    {/*eslint-disable-next-line*/}
                    <a href="#">StarShips</a>
                </li>
            </ul>
        </div>
    );
};

export default Header;
