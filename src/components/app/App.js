import React, {Component} from "react";
import Header from "../header";
import RandomPlanet from "../random-planet";
import PeoplePage from "../people-page";
import ErrorIndicator from "../error-indicator";
import ErrorBoundry from "../error-boundry";

import "./App.css";
import Row from "../row";
import ItemDetails from "../item-details";
import SwapiService from "../../services/service";

export default class App extends Component {
    state = {
        showRandomPlanet: true,
        hasError: false
    };

    swapiService = new SwapiService();

    componentDidCatch(error, errorInfo) {
        this.setState({hasError: true});
    }

    toggleRandomPlanet = () => {
        this.setState(state => {
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

        const {
            getPerson,
            getStarShip,
            getPersonImage,
            getStarshipImage,
        } = this.swapiService;

        const personDetails = (
            <ItemDetails
                itemId={11}
                getData={getPerson}
                getImageUrl={getPersonImage}/>
        );
        const starShipDetails = (
            <ItemDetails
                itemId={5}
                getData={getStarShip}
                getImageUrl={getStarshipImage}/>
        );

        return (
            <React.Fragment>
                <ErrorBoundry>
                    <Header/>
                    {planet}
                    {/*<div className="row mb2 button-row">*/}
                    {/*    <button*/}
                    {/*        className="toggle-planet btn btn-warning btn-lg"*/}
                    {/*        onClick={this.toggleRandomPlanet}*/}
                    {/*    >*/}
                    {/*        Toggle Random planet*/}
                    {/*    </button>*/}
                    {/*</div>*/}

                    {/*<PeoplePage/>*/}
                    <Row left={personDetails} right={starShipDetails}/>
                </ErrorBoundry>
            </React.Fragment>
        );
    }
}
