import React, { Component } from 'react'
import Axios from 'axios';
import Card from './Card';

export class CardTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            deckId : "",
            cardsRemaining : 0,
            cardsDealt: []
        }
        this.getCard = this.getCard.bind(this);
    }

    async componentDidMount() {
        const url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
        let response = await Axios.get(url);
        let data = response.data;
        this.setState({
            deckId : data.deck_id,
            cardsRemaining : data.remaining,
            cardsDealt : []
        })
        console.log(data)
        console.log(this.state)
    }

    getCard(e){
        Axios.get(`https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=1`).then(response=> {
            console.log(response.data.cards[0])
            this.setState({
                cardsRemaining:response.data.remaining,
                cardsDealt:[...this.state.cardsDealt, response.data.cards[0]]
            })
        })
    }

    render() {
        return (
            <div>
                <button onClick = {this.getCard}>Get a Card </button>
                {this.state.cardsDealt.map(card => <Card cardImage={card.image} desc={card.code}/>)}
            </div>
        )
    }
}

export default CardTable
