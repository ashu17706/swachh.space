import React, { Component } from 'react';
import './App.css';
import LandingPage from './LandingPage';
import ListingPage from './ListingPage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {page: 0};
  }

  changeScreen = () => {
    this.setState({page: 1});
  }
  render = () => {
    return (
      <div className="App">
        {
          this.state.page === 0 ?
            <LandingPage navigation={this.changeScreen} /> :
            <ListingPage navigation={this.changeScreen} />
        }
      </div>
    );
  }
}

export default App;
