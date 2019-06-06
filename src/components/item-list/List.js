import React, {Component} from "react";
import "./List.css";
import Spinner from "../spinner";

export default class ItemList extends Component {

    state = {
        itemList: [],
        loading: true
    };

    componentDidMount() {
        const {getData} = this.props;
        getData()
            .then(itemList => {
                this.setState({itemList});
            });
    }

    renderItems(arr) {
        return arr.map(({id, name}) => {
            return (
                <li
                    className="list-group-item"
                    onClick={() => this.props.onItemSelected(id)}
                    key={id}>
                    {name}
                </li>
            );
        });
    }

    render() {
        const {itemList} = this.state;
        const list = this.renderItems(itemList);

        if (!itemList) {
            return <Spinner/>;
        }

        return <ul className="item-list list-group">{list}</ul>;
    }
}
