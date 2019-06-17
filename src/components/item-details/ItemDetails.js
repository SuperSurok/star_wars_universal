import React, {Component} from "react";
import "./ItemDetails.css";

import Spinner from "../spinner";

export default class ItemDetails extends Component {

    state = {
        item: null,
        image: null
    };

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    updateItem() {
        const { itemId, getData, getImageUrl } = this.props;
        if (!itemId) {
            return;
        }

        getData(itemId)
            .then((item) => {
                this.setState({
                    item,
                    image: getImageUrl(item)
                });
            });
    }

    render() {

        const {item, image} = this.state;

        if (!item) {
            return <span>Select Item from a list</span>;
        }

        const {id, name, gender, birthYear, eyeColor } = item;
        if (!name) {
            return <Spinner/>;
        }

        return (
            <div className="item-details card">
                <img
                    alt="item details"
                    className="item-image"
                    src={image}
                />
                <div className="card-body" key={id}>
                    <h4>{name}</h4>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <span className="term">Gender</span>
                            <span>{gender}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Birth Year</span>
                            <span>{birthYear}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Eye Color</span>
                            <span>{eyeColor}</span>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
