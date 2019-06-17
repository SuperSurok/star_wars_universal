import React, {Component} from "react";

import "./PeoplePage.css";
import List from "../item-list";
import ItemDetails from "../item-details";
import ErrorIndicator from "../error-indicator";
import SwapiService from "../../services/service";
import Row from "../row";
import ErrorBoundry from "../error-boundry";


export default class PeoplePage extends Component {
    swapiService = new SwapiService();

    state = {
        selectedPerson: 1
    };

    onPersonSelected = id => {
        this.setState({selectedPerson: id});
    };

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator/>;
        }

        const itemList = (
            <ErrorBoundry>
                <List
                    onItemSelected={this.onPersonSelected}
                    getData={this.swapiService.getAllPeople}>
                    {(i) => (
                        `${i.name} ${i.gender} ${i.birthYear}`
                    )}
                </List>
            </ErrorBoundry>
        );

        const personDetails = (
            <ErrorBoundry>
                <ItemDetails itemId={this.state.selectedPerson}/>
            </ErrorBoundry>
        );

        return (
            <ErrorBoundry>
                <Row left={itemList} right={personDetails}/>
            </ErrorBoundry>
        );
    }
}
