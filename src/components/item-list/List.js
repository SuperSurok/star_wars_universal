import React, {Component} from "react";

import "./List.css";
import SwapiResource from "../../services/service";
import Spinner from "../spinner";

export default class ItemList extends Component {
    swapiService = new SwapiResource();

    state = {
        peopleList: [],
        loading: true
    };

    componentWillMount() {
        this.swapiService
            .getAllPeople()
            .then((peopleList) => {
                this.setState({peopleList});
            });
    }

    renderItems(arr) {
        return arr.map(({id, name}) => {
            return (
                <li className="list-group-item"
                    onClick={() => this.props.onItemSelected(id)}
                    key={id}>
                    {name}
                </li>
            );
        });
    }


    render() {
        const {peopleList} = this.state;
        const list = this.renderItems(peopleList);

        if (!peopleList) {
            return <Spinner/>;
        }

        return <ul className="item-list list-group">{list}</ul>;
    }
}
