import React, { Component } from 'react';
import './index.css';
import Card from './Card';

export default class ListingPage extends Component {
  constructor(props) {
      super(props);
      this.state = {};
  }

  componentWillMount = () => {
    console.log('as');
    fetch(`http://ec2-184-72-197-43.compute-1.amazonaws.com:3000/searchbydist?location=hyderabad&lat=17.4294396&long=78.3409519`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      this.setState(data);
    });
  }

  render() {
    console.log(this.state);
    return (
      <div className="ListingPage">
        <div className="Header">
          Swachh Spaces
        </div>
        <div className="Main">
          {this.state.data ?
            this.state.data.map((toilet, index) => (
            <Card key={index} name={toilet.docs.name} distance={toilet.dtext} address={toilet.docs.location} latitude={toilet.docs.cor.lat} longitude={toilet.docs.cor.long}/>
          )) :
          <Card />
            }
        </div>
      </div>
    );
  }
}
