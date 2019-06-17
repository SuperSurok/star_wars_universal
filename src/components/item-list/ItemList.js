import React from "react";

import withData from "../hoc-helpers";
import SwapiService from "../../services/service";
import "./ItemList.css";

const ItemList = (props) => {

    const {data, onItemSelected, children: renderLabel} = this.props;

    const items = data.map(item => {
        const {id} = item;
        const label = renderLabel(item);
        return (
            <li
                className="list-group-item"
                key={id}
                onClick={() => onItemSelected(id)}>
                {label}
            </li>
        );
    });
    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    )
};

// Higher order component

const {getAllPeople} = new SwapiService();

export default withData(ItemList, getAllPeople);
