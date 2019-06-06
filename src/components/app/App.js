import React, {Component} from "react";

import Header from "../header";
import RandomPlanet from "../random-planet";
import List from "../item-list";
import PeoplePage from "../people-page";

import "./App.css";
import ErrorIndicator from "../error-indicator";
import PersonDetails from "../person-details";
import SwapiService from "../../services/service";

export default class App extends Component {
    swapiService = new SwapiService();

    state = {
        showRandomPlanet: true,
        hasError: false
    };

    componentDidCatch(error, errorInfo) {
        this.setState({ hasError: true });
    }

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            };
        });
    };

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator/>;
        }
        const planet = this.state.showRandomPlanet ? <RandomPlanet/> : null;
        return (
            <React.Fragment>
                <Header/>
                {planet}
                <div className="row mb2 button-row">
                    <button
                        className="toggle-planet btn btn-warning btn-lg"
                        onClick={this.toggleRandomPlanet}
                    >
                        Toggle Random planet
                    </button>
                </div>

                <PeoplePage/>

                <div className="row mb2">
                    <div className="col-md-6">
                        <List
                            onItemSelected={this.onPersonSelected}
                            getData={this.swapiService.getAllPlanets}
                            renderItem={(item) => <span>{item.name}</span>}
                        />
                    </div>
                    <div className="col-md-6">
                        <PersonDetails personId={this.state.selectedPerson}/>
                    </div>
                </div>

                <div className="row mb2">
                    <div className="col-md-6">
                        <List
                            onItemSelected={this.onPersonSelected}
                            getData={this.swapiService.getAllStarShips}
                            renderItem={(item) => <span>{item.name}</span>}
                        />
                    </div>
                    <div className="col-md-6">
                        <PersonDetails personId={this.state.selectedPerson}/>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
