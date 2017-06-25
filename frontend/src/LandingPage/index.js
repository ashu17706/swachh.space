import React, { Component } from 'react';
import SearchToolbar from './SearchToolbar';
import SearchButton from './SearchButton';
import SubmitToilet from './SubmitToilet';

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    return (
      <div className="LandingPage">
        <SearchToolbar navigation={this.props.navigation} />
        <SearchButton />
        <SubmitToilet />
      </div>
    );
  }
}
