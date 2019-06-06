import React, {Component} from "react";
import "./ItemList.css";
import Spinner from "../spinner";

export default class ItemList extends Component {
    state = {
        itemList: [],
        loading: true
    };

    componentDidMount() {
        const {getData} = this.props;
        getData().then(itemList => {
            this.setState({itemList});
        });
    }

    renderItems(arr) {
        return arr.map((item) => {
            const {id} = item;
            const label = this.props.renderItem(item);
            return (
                <li
                    className="list-group-item"
                    onClick={() => this.props.onItemSelected(id)}
                    key={id}
                >
                    {label}
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
