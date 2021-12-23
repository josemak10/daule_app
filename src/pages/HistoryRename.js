import React, { useState } from 'react'
import { HistoryData } from '../components/HistoryData';
import { useHistory } from 'react-router-dom';

const urLConsulting = process.env.REACT_APP_API_CONSULTING;


export const HistoryRename = () => {

    const history = useHistory();
    const [data, setData] = useState([]);

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
                const temp = JSON.parse(xhr.response);
                let list = [];
                temp.forEach(result => {
                    const row = JSON.parse(result);
                    let state = '';
                    switch (row.status.status) {
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
                    const surname = row.request.buyer.surname ? row.request.buyer.surname : '';
                    list.push({
                        identifier: row.request.buyer.document,
                        name: `${row.request.buyer.name} ${surname}`,
                        amount: `${row.request.payment.amount.total}`,
                        state,
                        message: row.status.message,
                        date: row.status.date,
                        description: row.request.payment.description,
                        reference: row.request.payment.reference
                    })
                })
                setData(list);
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
                        className="container-button text-font"
                    >
                        {/* <img
                            src={img_return}
                            alt="next"
                            width="22px"
                            height="22px"
                        /> */}
                        Regresar
                    </button>   
                    <input
                        id="referencia"
                        name="referencia"
                        placeholder="CI / RUC / Pasaporte"
                        required
                        className="container-data-payment-input-design
                            container-customer-input-text
                            container-customer-input-text-reference-size"
                    />
                    <button
                        type="submit"
                        className="container-button text-font"
                    >
                        Consultar
                        {/* <img
                            src={img_search}
                            alt="next"
                            width="20px"
                            height="20px"
                        /> */}
                    </button>
                </div>
            </form>
            <HistoryData data={data} />
        </div>
    )
}
