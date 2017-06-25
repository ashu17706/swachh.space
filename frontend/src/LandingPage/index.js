import React, { Component } from 'react';
import SearchToolbar from './SearchToolbar';
import SearchButton from './SearchButton';
import SubmitToilet from './SubmitToilet';
import logo from './main.png';
import './index.css';

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    return (
      <div className="LandingPage">
        <div className="brand">swachh.space</div>
        <div>
          <img className="logo" src={logo} />
        </div>
        <SearchToolbar navigation={this.props.navigation} />
        <SearchButton />
        <SubmitToilet />
      </div>
    );
  }
}
