import React, { Component } from "react";
import Axios from "axios";
import Card from "./Card";
import "./CardTable.css"

export class CardTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deckId: "",
      cardsRemaining: 0,
      cardsDealt: [],
    };
    this.getCard = this.getCard.bind(this);
  }

  async componentDidMount() {
    const url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
    let response = await Axios.get(url);
    let data = response.data;
    this.setState({
      deckId: data.deck_id,
      cardsRemaining: data.remaining,
      cardsDealt: [],
    });
  }

  getCard(e) {
    if (this.state.cardsRemaining > 0){Axios.get(
      `https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=1`
    ).then((response) => {
      console.log(response.data.cards[0]);
      this.setState({
        cardsRemaining: response.data.remaining,
        cardsDealt: [...this.state.cardsDealt, response.data.cards[0]],
      });
    });
  } else {
    alert('Out of Cards! Refresh to start again')
  }}

  randomNumber() {
    return Math.floor(Math.random() * 100);
  }

  render() {
    const displayCards = this.state.cardsDealt.map((card) => (
      <Card
        cardImage={card.image}
        desc={card.code}
      />
    ));
    return (
      <div className="cardTable">
        <h1>Card Dealer</h1>
        <button onClick={this.getCard}>Get a Card </button>
        {displayCards}
      </div>
    );
  }
}

export default CardTable;
