import React from 'react'

const Card = (props) => 
    <div style = {props.style}>
        <p>{props.cardDetail}</p>
       <img src={props.cardImage} alt={props.desc}/> 
    </div>


export default Card;