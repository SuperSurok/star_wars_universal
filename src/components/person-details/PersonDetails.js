import React, {Component} from "react";
import "./PersonDetails.css";
import SwapiService from "../../services/service";

import Spinner from '../spinner';

export default class PersonDetails extends Component {
    state = {
        person: null,
        loading: true
    };

    swapiService = new SwapiService();

    componentDidMount() {
        this.updatePerson();
    }

    componentDidUpdate(prevProps) {
        if(this.props.personId !== prevProps.personId) {
            this.updatePerson();
        }
    }

    updatePerson() {
        const {personId} = this.props;
        if (!personId) {
            return;
        }
        this.swapiService.getPerson(personId).then(person => {
            this.setState({person});
        });
        this.setState({loading: false})
    }

    render() {

        if(!this.state.person) {
            return <Spinner/>;
        }

        const {id, name, gender, birthYear, eyeColor} = this.state.person;
        if(!name) {return <Spinner/>}

        return (
            <div className="person-details card">
                <img
                    alt="Person details"
                    className="person-image"
                    src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
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
