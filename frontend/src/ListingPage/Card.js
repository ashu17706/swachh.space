import React, { Component } from 'react';
import './Card.css';

export default class Card extends Component {

  constructor(props) {
    super(props);

  }

  render() {

    let href = `http://maps.google.com/maps?daddr=${this.props.name}@${this.props.latitude},${this.props.longitude}`;
    return (
      <div className="Card">
        <p>{this.props.name}</p>
        <p className="address">{this.props.address}</p>
        <span>{this.props.distance}</span>
        <a href={href}>
          <svg fill="#000000" height="36" viewBox="0 0 24 24" width="36" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" fill="#4285f4"/>
          </svg>
        </a>
      </div>
    );
  }
}
