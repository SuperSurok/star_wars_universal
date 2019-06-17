import React, {Component} from "react";

import "./PeoplePage.css";
import ItemList from "../item-list";
import ItemDetails from "../item-details";
import SwapiService from "../../services/service";
import Row from "../row";
import ErrorBoundry from "../error-boundry";

export default class PeoplePage extends Component {
    swapiService = new SwapiService();

    state = {
        selectedPerson: 11
    };

    onPersonSelected = selectedPerson => {
        this.setState({selectedPerson});
    };

    render() {
        const itemList = (
            <ItemList
                onItemSelected={this.onPersonSelected}
                getData={this.swapiService.getAllPeople}
            >
                {i => `${i.name}  (${i.birthYear})`}
            </ItemList>
        );

        const personDetails = (
            <ErrorBoundry>
                <ItemDetails itemId={this.state.selectedPerson}/>
            </ErrorBoundry>
        );

        return <Row left={itemList} right={personDetails}/>;
    }
}
