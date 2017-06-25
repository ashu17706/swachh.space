import React, { Component } from 'react';
import './SearchBar.css';

export default class SearchBar extends Component {
  render() {
    return (
      <span className="SearchBar">
        <input type="text" placeholder="Enter your location" />
      </span>
    );
  }
}
