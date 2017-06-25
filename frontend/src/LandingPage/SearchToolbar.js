import React, { Component } from 'react';
import SearchBar from './SearchBar';
import Location from './Location';
import './SearchToolbar.css';

export default class SearchToolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {coords: {}};
  }

  updateLocation = (latitude, longitude) => {
    this.setState({coords: {'latitude' : latitude, 'longitude': longitude}});
    console.log(JSON.stringify(this.state.coords));
    fetch(`http://ec2-184-72-197-43.compute-1.amazonaws.com:3000/searchbydist?location=hyderabad&lat=17.4294396&long=78.3409519`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      this.props.navigation();
    });
  }

  render = () => {
    return (
      <div className="SearchToolbar">
        <SearchBar />
        <Location updateLocation={this.updateLocation}/>
      </div>
    );
  }
}
