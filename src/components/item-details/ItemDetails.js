import React, {Component} from "react";
import "./ItemDetails.css";
import Spinner from "../spinner";
import SwapiService from "../../services/service";

const Record = ({item, field, label}) => {
    return (
        <li className="list-group-item">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    );
};

export {Record};

export default class ItemDetails extends Component {
    swapiService = new SwapiService();

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
        const {itemId, getData, getImageUrl} = this.props;
        if (!itemId) {
            return;
        }

        getData(itemId).then(item => {
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

        const {id, name} = item;
        if (!name) {
            return <Spinner/>;
        }

        return (
            <div className="item-details card">
                <img alt="item details" className="item-image" src={image}/>
                <div className="card-body" key={id}>
                    <h4>{name}</h4>
                    <ul className="list-group list-group-flush">
                        {React.Children.map(this.props.children, child => {
                            return React.cloneElement(child, {item});
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}
