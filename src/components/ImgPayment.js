import React from 'react';

import file_questions_currents from '../assets/preguntas_frecuentes.pdf';

export const ImgPayment = () => {

    const onClick = () => {
        const win = window.open("/historial-transacciones", "_blank");
        win.focus();
    }

    return (
        <div className="container-img-payment">
            <a 
                href={file_questions_currents}
                target="_blank"
                rel="no noreferrer"
                className="container-img-payment-link"
            >
                Preguntas frecuentes</a>
            <label
                style={{
                    cursor: 'pointer',
                    color: '#1890FF'
                }}
                onClick={onClick}
                className="container-img-payment-link"
            >
                Historial transacciones</label>
        </div>
    )
}
