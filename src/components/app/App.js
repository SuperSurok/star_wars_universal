import React, {Component} from "react";

import Header from "../header";
import RandomPlanet from "../random-planet";
import List from "../item-list";
import PeoplePage from "../people-page"

import "./App.css";
import ErrorIndicator from "../error-indicator";

export default class App extends Component {
    state = {
        showRandomPlanet: true,
        hasError: false
    };

    componentDidCatch(error, errorInfo) {
        this.setState({
            hasError: true
        });
        console.log(error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator/>;
        }
        const planet = this.state.showRandomPlanet ? <RandomPlanet/> : null;
        return (
            <div>
                <Header/>
                {planet}
                <PeoplePage/>
            </div>
        );
    }
}
