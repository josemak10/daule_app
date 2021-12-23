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
                <a
                    className="container-total-text"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://siim.daule.gob.ec:9443/recursos_siim/aplicacionMovil/Terminos_condiciones_boton.pdf"
                >
                    Al marcar la casilla el usuario acepta los términos y condiciones del servicio.
                </a>
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
