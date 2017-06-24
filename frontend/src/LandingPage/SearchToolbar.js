import React, { Component } from 'react';
import SearchBar from './SearchBar';
import Location from './Location';

export default class SearchToolbar extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <Location />
      </div>
    );
  }
}
