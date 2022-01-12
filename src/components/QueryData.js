import React, { useContext, useState, useEffect } from 'react';
import { notification, message, Spin } from 'antd';
import { AllContext } from '../context/AllContext';
import { useHistory } from 'react-router-dom';

const urlPending = process.env.REACT_APP_API_PENDING;
const baseUrl = process.env.REACT_APP_API_URL;
const token = process.env.REACT_APP_KEY_ACCESTOKEN;


export const QueryData = ({ setClient, uid, total_temp }) => {
 
    const history = useHistory();
    const { allState } = useContext( AllContext );
    const { ids, invoices } = allState;
    const [totalPayment, setTotalPayment] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [total, setTotal] = useState(total_temp);
    const xhr = new XMLHttpRequest();

    const onContinue = () => {
        history.replace('facturas-a-pagar');
    }

    useEffect(() => {
        let temp = 0;
        invoices.forEach(invoice => temp += invoice.totalTarifa );
        setTotalPayment(temp.toFixed(2));
    }, [invoices])

    const getInvoices = () => {
        if ( xhr.status === 200 ) {
            let temp = 0;
            const data = JSON.parse( xhr.response );
            if (!data || data.length <= 0) {
                message.info("No contiene deuda", 2);
                setClient({
                    name: '',
                    data: [],
                });
            } else {
                setClient({
                    name: data[0].apellido + ' ' + data[0].nombre,
                    data: data,
                })
                data.forEach(invoice => temp += invoice.totalTarifa );   
            }
            setTotal(temp.toFixed(2));
        }
        setIsLoading( false );
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const identifier = e.nativeEvent.target.identifier.value;
        if (!identifier){
            message.error("Es necesario ingresar una Cédula-RUC", 2);
            return;
        }
        setIsLoading(true);
         
        xhr.open(
            'POST',
            baseUrl,
        )
        xhr.addEventListener("load", getInvoices);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.setRequestHeader("Accesstoken", token);
        xhr.send( identifier ); 

        const xhr1 = new XMLHttpRequest();
        const url = `${urlPending}=${identifier}`;
        xhr1.open(
            "GET",
            url,
            false,
        )
        xhr1.setRequestHeader("Content-type", "application/json");
        xhr1.send();
        if ( xhr1.status === 200 ) {
            if ( JSON.parse(xhr1.response)[0] ) {
                const args = {
                    message: 'Transacciones pendientes',
                    description: `Este contribuyente tiene transacciones pendientes, 
                        a continuacion las referencias: ${JSON.parse(xhr1.response).toString()}`,
                    duration: 0
                }
                notification.info(args);
            }
        }
    }

    return (
        <form
            onSubmit={onSubmit}
        >
            <div
                className='row justify-content-between after-component'
            >
                <label
                    className="col-5 col-md-3
                        container-total-data-text-total text-font"
                >
                    Deuda total: $ {total} 
                </label>
                <label
                    className="col-5 col-md-3
                        container-total-data-text-total-yellow text-font"
                >
                    Monto a pagar: $ {totalPayment} 
                </label>
                <button
                    onClick={onContinue}
                    disabled={ids.length===0}
                    className="col-12 col-md-2
                        container-button text-font"
                >
                    Continuar
                </button>
            </div>
            <div 
                className='row justify-content-between after-component'
            >
                <input
                    type="text"
                    name="identifier"
                    id="identifier"
                    defaultValue={uid}
                    placeholder="CI / RUC"
                    className="col-5 col-md-2 
                        container-data-payment-input-design
                        container-customer-input-text"
                />
                <div className="col-auto col-md-2">
                    <Spin
                        spinning={ isLoading }
                        tip="Cargando ..."
                        className="spin"
                    >
                        <button
                            type="submit"
                            className="w-100 container-button text-font"
                        >
                            Consultar
                        </button>
                    </Spin>
                </div>
            </div>
        </form>
    )
}
