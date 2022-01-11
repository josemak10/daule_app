import React from 'react';

import file_questions_currents from '../assets/preguntas_frecuentes.pdf';

export const ImgPayment = () => {

    const onClick = () => {
        const win = window.open("/historial-transacciones", "_self");
        win.focus();
    }

    return (
        <div className="row justify-content-around after-component before-component" >
            <a 
                href={file_questions_currents}
                target="_blank"
                rel="noopener noreferrer"
                className="col-5 col-md-3 container-img-payment-link text-font"
            >
                Preguntas frecuentes</a>
            <label
                style={{
                    cursor: 'pointer',
                    color: '#1890FF'
                }}
                onClick={onClick}
                className="col-5 col-md-3 container-img-payment-link text-font"
            >
                Historial transacciones</label>
        </div>
    )
}
