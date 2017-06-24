import React, { Component } from 'react';
import './App.css';
import SearchToolbar from './LandingPage/SearchToolbar';
import SearchButton from './LandingPage/SearchButton';
import SubmitToilet from './LandingPage/SubmitToilet';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SearchToolbar />
        <SearchButton />
        <SubmitToilet />
      </div>
    );
  }
}

export default App;
