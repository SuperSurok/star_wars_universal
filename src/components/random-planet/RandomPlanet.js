import React, {Component} from "react";
import SwapiService from "../../services/service";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator"

import "./RandomPlanet.css";

export default class RandomPlanet extends Component {
    state = {
        planet: {},
        loading: true,
        error: false
    };

    swapiService = new SwapiService();

    onPlanetLoaded = planet => {
        this.setState({planet, loading: false});
    };

    componentWillMount() {
        this.updatePlanet();
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    };

    updatePlanet() {
        // const id = Math.floor(Math.random() * 37 + 1);
        const id = 1200;
        this.swapiService
            .getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch(this.onError);
    }

    render() {
        const {planet, loading, error} = this.state;

        const hasData = !(loading || error);

        const spinner = loading ? <Spinner/> : null;
        const content = hasData ? <PlanetView planet={planet}/> : null;
        const errorMessage = error ? <ErrorIndicator/> : null;

        return (
            <div className="random-planet jumbotron rounded">
                {spinner}
                {content}
                {errorMessage}
            </div>
        );
    }
}

const PlanetView = ({planet}) => {
    const {id, name, population, rotationPeriod, diameter} = planet;
    return (
        <React.Fragment>
            <img
                alt="Planet"
                className="planet-image"
                src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
            />
            <div>
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">{population}</span>
                        <span>Population</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">{rotationPeriod}</span>
                        <span>Rotation Period</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">{diameter}</span>
                        <span>Rotation Period</span>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    )
}
