import React, { useContext, useState, useEffect } from 'react';
import { notification, message, Spin } from 'antd';
import { AllContext } from '../context/AllContext';
import { useHistory } from 'react-router-dom';

import { fetchConTocken } from '../helpers/fetch';

const urlPending = process.env.REACT_APP_API_PENDING;


export const QueryData = ({ setClient, uid, total_temp }) => {
 
    const history = useHistory();
    const { allState } = useContext( AllContext );
    const { ids, invoices } = allState;
    const [totalPayment, setTotalPayment] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [total, setTotal] = useState(total_temp);

    const onContinue = () => {
        history.replace('facturas-a-pagar');
    }

    console.log(isLoading);
    useEffect(() => {
        let temp = 0;
        invoices.forEach(invoice => temp += invoice.totalTarifa );
        setTotalPayment(temp.toFixed(2));
    }, [invoices])

    const onSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        const identifier = e.nativeEvent.target.identifier.value;
        if (!identifier){
            message.error("Es necesario ingresar una Cédula-RUC", 2);
            return;
        }
        const data = await fetchConTocken('deudas', identifier, 'POST');
        let temp = 0;
        if (!data || data.length <= 0) {
            message.info("No contiene deuda", 2);
            setClient({
                name: '',
                data: [],
            });
            setIsLoading( false );
        } else {
            setClient({
                name: data[0].apellido + ' ' + data[0].nombre,
                data: data,
            })
            data.forEach(invoice => temp += invoice.totalTarifa );
            setIsLoading( false );
        }
        setTotal(temp.toFixed(2));
         
        const xhr = new XMLHttpRequest();
        const url = `${urlPending}=${identifier}`;
        xhr.open(
            "GET",
            url,
            false,
        )
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send();
        if ( xhr.status === 200 ) {
            if ( JSON.parse(xhr.response)[0] ) {
                const args = {
                    message: 'Transacciones pendientes',
                    description: `Este contribuyente tiene transacciones pendientes, 
                        a continuacion las referencias: ${JSON.parse(xhr.response).toString()}`,
                    duration: 0
                }
                notification.info(args);
            }
        }
    }

    return (
        <form
            className="container-query-data"
            onSubmit={onSubmit}
        >
            <div className="container-query-data-input">
                <input
                    type="text"
                    name="identifier"
                    id="identifier"
                    defaultValue={uid}
                    // onChange={onChange}
                    placeholder="CI / RUC"
                    className="container-data-payment-input-design
                        container-customer-input-text"
                />
                <Spin spinning={isLoading}>
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
                </Spin>
            </div>
            <div className="container-query-data-input">
                <label 
                    className="container-total-data-text-total text-font"
                >
                    Deuda total: $ {total} 
                </label>
                <label 
                    className="container-total-data-text-total-yellow text-font"
                >
                    Monto a pagar: $ {totalPayment} 
                </label>
                <button
                    onClick={onContinue}
                    disabled={ids.length===0} 
                    className="container-button text-font"
                >
                    Continuar
                    {/* <img
                        src={img_next}
                        alt="next"
                        width="22px"
                        height="22px"
                    /> */}
                </button>
            </div>
        </form>
    )
}
