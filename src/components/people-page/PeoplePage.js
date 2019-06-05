import React, {Component} from "react";

import "./PeoplePage.css";
import List from "../item-list";
import PersonDetails from "../person-details";
import ErrorIndicator from "../error-indicator";

export default class PeoplePage extends Component {
    state = {
        selectedPerson: 1,
        hasError: false
    };

    componentDidCatch(error, errorInfo) {
        this.setState({hasError: true});
        console.log(error, errorInfo);
    }

    onPersonSelected = id => {
        this.setState({selectedPerson: id});
    };

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator/>;
        }
        return (
            <div className="row mb2">
                <div className="col-md-6">
                    <List onItemSelected={this.onPersonSelected}/>
                </div>
                <div className="col-md-6">
                    <PersonDetails personId={this.state.selectedPerson}/>
                </div>
            </div>
        );
    }
}