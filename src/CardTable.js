import React, { Component } from 'react'
import Axios from 'axios';

export class CardTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            deckId : "",
            cardsRemaining : 0,
            cardDealt: []
        }
        this.getCard = this.getCard.bind(this);
    }

    async componentDidMount() {
        const url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
        let response = await Axios.get(url);
        let data = response.data;
        this.setState({
            deckId : data.deck_id,
            cardsRemaining : data.remaining
        })
        console.log(data)
        console.log(this.state)
    }

    getCard(e){
        Axios.get(`https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=1`).then(response=> {
            console.log(response.data.cards[0])
            this.setState({
                cardsRemaining:response.data.remaining,
                cardDealt:response.data.cards[0]
            })
        })
    }

    render() {
        return (
            <div>
                <button onClick = {this.getCard}>Get a Card </button>
            </div>
        )
    }
}

export default CardTable
