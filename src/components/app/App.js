import React, {Component} from "react";
import Header from "../header";
import RandomPlanet from "../random-planet";
import ErrorIndicator from "../error-indicator";
import ErrorBoundry from "../error-boundry";
import "./App.css";
import Row from "../row";
import ItemDetails, {Record} from "../item-details";
import SwapiService from "../../services/service";
import ItemList from "../item-list";

export default class App extends Component {
    state = {
        showRandomPlanet: true,
        hasError: false
    };

    swapiService = new SwapiService();

    componentDidCatch(error, errorInfo) {
        this.setState({hasError: true});
    }

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
            getAllPeople,
            getAllPlanets
        } = this.swapiService;

        const personDetails = (
            <ItemDetails itemId={11} getData={getPerson} getImageUrl={getPersonImage}>
                <Record field="gender" label="Gender:"/>
                <Record field="eyeColor" label="Eye Color:" onItemSelected={() => {
                }}/>
                {({name}) => <span>{name}</span>}
            </ItemDetails>
        );
        const starShipDetails = (
            <ItemDetails
                itemId={5}
                getData={getStarShip}
                getImageUrl={getStarshipImage}
            >
                <Record field="model" label="Model:"/>
                <Record field="length" label="Length:"/>
                <Record field="costInCredits" label="Cost in Credits:"/>
                {({name}) => <span>{name}</span>}
            </ItemDetails>
        );

        return (
            <ErrorBoundry>
                <React.Fragment>
                    <ErrorBoundry>
                        <Header/>
                        {planet}
                        <ItemList
                            getData={getAllPeople}
                            onItemSelected={() => {}}>
                            {({name}) => <span>{name}</span>}
                        </ItemList>

                        <ItemList
                            getData={getAllPlanets}
                            onItemSelected={() => {}}>
                            {({name}) => <span>{name}</span>}
                        </ItemList>
                        <Row left={personDetails} right={starShipDetails}/>
                    </ErrorBoundry>
                </React.Fragment>
            </ErrorBoundry>
        );
    }
}
