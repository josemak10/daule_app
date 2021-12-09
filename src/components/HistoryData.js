import React from 'react';

export const HistoryData = () => {
    return (
        <div className="container-customer">
            <label
                className="container-customer-data-text"
            >
                Tipo Identificador</label>
            <input
                id="tipo_doc"
                name="tipo_doc"
                disabled
                // value={ data.tipo_doc }
                className="container-data-payment-input-design
                    container-customer-input-text
                    container-customer-input-text-size"
            />
            <label
                className="container-customer-data-text"
            >
                Identificador</label>
            <input
                id="cedula"
                name="cedula"
                type="number"
                disabled
                // value={ data.cedula }
                className="container-data-payment-input-design
                    container-customer-input-text
                    container-customer-input-text-size"
            />
            <label
                className="container-customer-data-text"
            >
                Nombre</label>
            <input
                id="cedula"
                name="cedula"
                type="number"
                disabled
                // value={ data.cedula }
                className="container-data-payment-input-design
                    container-customer-input-text
                    container-customer-input-text-size"
            />
            <label
                className="container-customer-data-text"
            >
                Valor pagado</label>
            <input
                id="cedula"
                name="cedula"
                type="number"
                disabled
                // value={ data.cedula }
                className="container-data-payment-input-design
                    container-customer-input-text
                    container-customer-input-text-size"
            />
            <label
                className="container-customer-data-text"
            >
                Fecha pago</label>
            <input
                id="cedula"
                name="cedula"
                type="number"
                disabled
                // value={ data.cedula }
                className="container-data-payment-input-design
                    container-customer-input-text
                    container-customer-input-text-size"
            />
        </div>
    )
}
