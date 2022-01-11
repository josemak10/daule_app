import React from 'react';

import img_credit_cards from '../assets/credit-cards.jpeg';


export const ContainerTotal = ({ total, setIsDone, isDone }) => {

    const onChange = () => {
        setIsDone( !isDone );
    }

    return (
        <div
            // className="container-total-block"
        >
            <div
                className="row justify-content-between align-items-center"
                // className="container-total-block2"
            >   
                <a
                    // className="container-total-text"
                    className="col-12 col-md-6"
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
                    className="col-6 col-md-1"
                    value={isDone}
                    onChange={ onChange }
                />
                <img
                    src="https://static.placetopay.com/placetopay-logo-square.svg"
                    alt="Logo PlaceToPay"
                    width="75px"
                    height="65px"
                    className="col-6 col-md-1"
                />
                <img
                    src={img_credit_cards}
                    alt="Logo Tarjetas credito"
                    width="300px"
                    height="40px"
                    className="col-12 col-md-4"
                />
            </div>
        </div>
    )
}
