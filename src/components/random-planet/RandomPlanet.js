import React, {Component} from "react";
import SwapiService from "../../services/service";
import Spinner from '../spinner'

import "./RandomPlanet.css";

export default class RandomPlanet extends Component {
    state = {
        planet: {}
    };

    swapiService = new SwapiService();

    constructor(props) {
        super(props);
        this.updatePlanet();
    }

    onPlanetLoaded = planet => {
        this.setState({planet});
    };

    updatePlanet() {
        const id = Math.floor(Math.random() * 37 + 1);
        this.swapiService.getPlanet(id).then(this.onPlanetLoaded);
    }

    render() {
        const { planet: {id, name, population, rotationPeriod, diameter} } = this.state;


        return (
            <div className="random-planet jumbotron rounded">
                {/*<img*/}
                {/*    className="planet-image"*/}
                {/*    src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}*/}
                {/*/>*/}
                {/*<div>*/}
                {/*    <h4>{name}</h4>*/}
                {/*    <ul className="list-group list-group-flush">*/}
                {/*        <li className="list-group-item">*/}
                {/*            <span className="term">{population}</span>*/}
                {/*            <span>Population</span>*/}
                {/*        </li>*/}
                {/*        <li className="list-group-item">*/}
                {/*            <span className="term">{rotationPeriod}</span>*/}
                {/*            <span>Rotation Period</span>*/}
                {/*        </li>*/}
                {/*        <li className="list-group-item">*/}
                {/*            <span className="term">{diameter}</span>*/}
                {/*            <span>Rotation Period</span>*/}
                {/*        </li>*/}
                {/*    </ul>*/}
                {/*</div>*/}
                <Spinner/>
            </div>
        );
    }
}
