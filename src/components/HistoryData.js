import React from 'react';

export const HistoryData = ({ data }) => {
    return (
        <div className="container-customer">
            <label
                className="container-customer-data-text"
            >
                Identificador</label>
            <input
                value={ data.identifier }
                disabled
                className="container-data-payment-input-design
                    container-customer-input-text
                    container-customer-input-text-size"
            />
            <label
                className="container-customer-data-text"
            >
                Nombre</label>
            <input
                disabled
                value={ data.name }
                className="container-data-payment-input-design
                    container-customer-input-text
                    container-customer-input-text-size"
            />
            <label
                className="container-customer-data-text"
            >
                Valor pagado</label>
            <input
                disabled
                value={ data.amount }
                className="container-data-payment-input-design
                    container-customer-input-text
                    container-customer-input-text-size"
            />
            <label
                className="container-customer-data-text"
            >
                Estado</label>
            <input
                disabled
                value={ data.state }
                className="container-data-payment-input-design
                    container-customer-input-text
                    container-customer-input-text-size"
            />
            <label
                className="container-customer-data-text"
            >
                Mensaje</label>
            <input
                disabled
                value={ data.message }
                className="container-data-payment-input-design
                    container-customer-input-text
                    container-customer-input-text-size"
            />
            <label
                className="container-customer-data-text"
            >
                Fecha transaccion</label>
            <input
                disabled
                value={ data.date }
                className="container-data-payment-input-design
                    container-customer-input-text
                    container-customer-input-text-size"
            />
            <label
                className="container-customer-data-text"
            >
                Descripcion</label>
            <input
                disabled
                value={ data.description }
                className="container-data-payment-input-design
                    container-customer-input-text
                    container-customer-input-text-size"
            />
        </div>
    )
}
