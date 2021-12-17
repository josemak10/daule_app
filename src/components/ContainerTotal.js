import React from 'react';

import img_credit_cards from '../assets/credit-cards.jpeg';


export const ContainerTotal = ({ total, setIsDone, isDone }) => {

    const onChange = () => {
        setIsDone( !isDone );
    }

    return (
        <div className="container-total-block">
            <div 
                className="container-total-block2"
            >   
                <label
                    className="container-total-text"
                >
                    Al marcar la casilla el usuario acepta los términos y condiciones del servicio.
                </label>
                <input
                    id="done"
                    name="done"
                    type="checkbox"
                    value={isDone}
                    onChange={ onChange }
                />
                <img
                    src="https://static.placetopay.com/placetopay-logo-square.svg"
                    alt="Logo PlaceToPay"
                    width="75px"
                    height="65px"
                />
                <img
                    src={img_credit_cards}
                    alt="Logo Tarjetas credito"
                    width="300px"
                    height="40px"
                />
            </div>
        </div>
    )
}
