import React, { Component } from "react";
import "./Card.css";

export default class Card extends Component {
  constructor(props) {
    super(props);

    const rotateCard = Math.floor(Math.random() * 90 - 45)
    const moveX = Math.floor(Math.random() * 40 - 20);
    const moveY = Math.floor(Math.random() * 40 - 20);
    this.moveCard = `translate(${moveX}px, ${moveY}px) rotate(${rotateCard}deg)`;
  }
  render() {
    return (
      <div className="cards">
        <div className="card" style={{ transform: this.moveCard }}>
          <img src={this.props.cardImage} alt={this.props.desc} />{" "}
        </div>
      </div>
    );
  }
}
