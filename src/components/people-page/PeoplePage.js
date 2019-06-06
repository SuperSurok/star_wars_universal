import React, { Component } from "react";

import "./PeoplePage.css";
import List from "../item-list";
import PersonDetails from "../person-details";
import ErrorIndicator from "../error-indicator";
import SwapiService from "../../services/service";
import Row from "../row"

export default class PeoplePage extends Component {
  state = {
    selectedPerson: 1,
    hasError: false
  };

  swapiService = new SwapiService();

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true });
    console.log(error, errorInfo);
  }

  onPersonSelected = id => {
    this.setState({ selectedPerson: id });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }

    const itemList = (
      <List
        onItemSelected={this.onPersonSelected}
        getData={this.swapiService.getAllPeople}
        renderItem={({ name, gender, birthYear }) =>
          `${name} ${gender} ${birthYear}`
        }
      />
    );

    const personDetails = (
      <PersonDetails personId={this.state.selectedPerson} />
    );

    return <Row left={itemList} right={personDetails}/>;
  }
}
