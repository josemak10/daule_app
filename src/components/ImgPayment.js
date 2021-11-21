import React from 'react';

import file_questions_currents from '../assets/preguntas_frecuentes.pdf';

export const ImgPayment = () => {

    //TODO: Nueva ventana para consultar las transacciones

    return (
        <div className="container-img-payment">
            <img
                src="https://static.placetopay.com/placetopay-logo-square.svg"
                alt="Logo PlaceToPay"
                width="75px"
                height="65px"
            />
            <a 
                href={file_questions_currents}
                target="_blank"
                rel="no noreferrer"
                className="container-img-payment-link"
            >
                Preguntas frecuentes</a>
            <a 
                href={file_questions_currents}
                target="_blank"
                rel="no noreferrer"
                className="container-img-payment-link"
            >
                Historial transacciones</a>
        </div>
    )
}
