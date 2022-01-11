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
                    const row = result;
                    let state = row.status;
                    const surname = ''
                    list.push({
                        identifier: row.document,
                        name: surname,
                        amount: `${row.total}`,
                        state,
                        message: row.message,
                        date: `Fecha Transacción: ${row.date.toString().substring(0,10)}`,
                        description: '',
                        reference: row.referencia
                    })
                })
                setData(list);
            }
        }
        xhr.send();
    }

    return (
        <div>
            <form
                onSubmit={ onSubmit }
                // className="before-component"
            >
                <div
                    className="row justify-content-between after-component"
                >
                    <button
                        onClick={toReturn}
                        className="col-auto col-md-2 container-button text-font"
                    >
                        Regresar
                    </button>   
                    <input
                        id="referencia"
                        name="referencia"
                        placeholder="CI / RUC / Pasaporte"
                        required
                        className="col-auto
                            container-data-payment-input-design
                            container-customer-input-text"
                    />
                    <button
                        type="submit"
                        className="col-auto col-md-2 container-button text-font"
                    >
                        Consultar
                    </button>
                </div>
            </form>
            <HistoryData data={data} />
        </div>
    )
}
