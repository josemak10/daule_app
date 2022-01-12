import React, { useState } from 'react'
import { HistoryData } from '../components/HistoryData';
import { useHistory } from 'react-router-dom';
import { Spin } from 'antd';

const urLConsulting = process.env.REACT_APP_API_CONSULTING;


export const HistoryRename = () => {

    const history = useHistory();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const xhr = new XMLHttpRequest();

    const toReturn = () => {
        history.replace('/pagos-en-line');
    }

    const getInvoices = () => {
        if ( xhr.readyState===4) {
            let temp;
            try {
                temp = JSON.parse(xhr.response);
            } catch (error) {
                temp = []
            }
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
            setIsLoading( false );
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setIsLoading( true );
        const url = `${urLConsulting}=${e.nativeEvent.target.referencia.value}`;
        xhr.open(
            "GET",
            url,
        )
        xhr.addEventListener("readystatechange", getInvoices);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send();
    }

    return (
        <div>
            <form
                onSubmit={ onSubmit }
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
                    <div className="col-auto col-md-2">
                        <div className="row">
                            <Spin
                                spinning={ isLoading }
                                wrapperClassName="col spin2"
                            >
                                <button
                                    type="submit"
                                    className="container-button text-font"
                                >
                                    Consultar
                                </button>
                            </Spin>
                        </div>
                    </div>
                </div>
            </form>
            <HistoryData data={data} />
        </div>
    )
}
