import React, { Component } from 'react';
import './Location.css';

export default class Location extends Component {
  constructor(props) {
      super(props);
  }

  handleClick = () => {
      if( "geolocation" in navigator ) {
        navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        this.props.updateLocation(latitude, longitude);
        });
      } else {
        console.log('Your browser dont support Geolocation,');
      }
  }

  render = () => {
    return (
      <a onClick={this.handleClick}>
        <span className="Location">
          <svg fill="#000000" height="44" viewBox="0 0 44 44" width="44" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
          </svg>
        </span>
      </a>
    );
  }
}
