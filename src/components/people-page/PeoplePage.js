import React, {Component} from "react";

import "./PeoplePage.css";
import List from "../item-list";
import PersonDetails from "../person-details";
import ErrorIndicator from "../error-indicator";
import SwapiService from "../../services/service";
import Row from "../row";

class ErrorBoundry extends Component {
    state = {
        hasError: false
    };

    componentDidCatch() {
        this.setState({hasError: true});
    }

    render() {
        if (this.state.hasError) return <ErrorIndicator/>;
        return this.props.children;
    }
}

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
                    getData={this.swapiService.getAllPeople}
                    renderItem={({name, gender, birthYear}) =>
                        `${name} ${gender} ${birthYear}`
                    }
                />
            </ErrorBoundry>
        );

        const personDetails = (
            <ErrorBoundry>
                <PersonDetails personId={this.state.selectedPerson}/>
            </ErrorBoundry>
        );

        return (
            <ErrorBoundry>
                <Row left={itemList} right={personDetails}/>
            </ErrorBoundry>
        );
    }
}
