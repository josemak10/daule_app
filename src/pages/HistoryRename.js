import React, { useState } from 'react'
import { HistoryData } from '../components/HistoryData';
import { useHistory } from 'react-router-dom';

import img_search from '../assets/magnify-black.png';
import img_return from '../assets/chevron-left-black.png';

const urLConsulting = process.env.REACT_APP_API_CONSULTING;


export const HistoryRename = () => {

    const history = useHistory();
    const [data, setData] = useState({
        identifier: '',
        name: '',
        amount: '',
        state: '',
        message: '',
        date: '',
        description: ''
    })

    const toReturn = () => {
        history.replace('/pagos-en-line');
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const url = `${urLConsulting}=${e.nativeEvent.target.referencia.value}`;
        const xhr = new XMLHttpRequest();
        xhr.open(
            "GET",
            url,
        )
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () {
            if ( xhr.readyState===4) {
                const result = JSON.parse(xhr.response);
                if (result) {
                    let state = '';
                    switch (result.status.status) {
                        case 'REJECTED':
                            state = 'Rechazada';
                            break;
                        case 'APPROVED':
                            state = 'Aprobado';
                            break;
                        default:
                            state = 'Pendiente';
                            break;
                    }
                    setData({
                        identifier: result.request.buyer.document,
                        name: `${result.request.buyer.name} ${result.request.buyer.surname}`,
                        amount: result.request.payment.amount.total,
                        state,
                        message: result.status.message,
                        date: result.status.date,
                        description: result.request.payment.description
                    })
                } else {
                    setData({
                        identifier: '',
                        name: '',
                        amount: '',
                        state: '',
                        message: '',
                        date: '',
                        description: ''
                    })
                }
            }
        }
        xhr.send();
    }

    return (
        <div className="container-style">
            <form
                className="container-history"
                onSubmit={ onSubmit }
            >
                <div className="container-query-data-input">
                    <button
                        onClick={toReturn}
                    >
                        <img
                            src={img_return}
                            alt="next"
                            width="22px"
                            height="22px"
                        />
                        Regresar
                    </button>   
                    <input
                        id="referencia"
                        name="referencia"
                        placeholder="# Transacción"
                        required
                        className="container-data-payment-input-design
                            container-customer-input-text
                            container-customer-input-text-reference-size"
                    />
                    <button type="submit">
                        Consultar
                        <img
                            src={img_search}
                            alt="next"
                            width="20px"
                            height="20px"
                        />
                    </button>
                </div>
            </form>
            <HistoryData data={data} />
        </div>
    )
}
