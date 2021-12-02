import React, { useContext, useEffect, useState } from 'react';
import { message, Spin } from 'antd';
import { SocketContext } from '../context/SocketContext';
import { AllContext } from '../context/AllContext';
import { useHistory } from 'react-router-dom';


export const QueryData = ({ setClient }) => {
 
    const history = useHistory();
    const { allState } = useContext( AllContext );
    const { ids } = allState;
    const { socket } = useContext(SocketContext);
    const [isLoading, setIsLoading] = useState(false);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        socket?.on('search-client', (data) => {
            let temp = 0;
            if (!data || data.length <= 0) {
                message.info("No contiene deuda", 2);
                setClient({
                    name: '',
                    data: [],
                })
            } else {
                setClient({
                    name: data[0].apellido + ' ' + data[0].nombre,
                    data: data,
                })
                data.forEach(invoice => temp += invoice.totalTarifa );
            }
            setTotal(temp.toFixed(2));
            setIsLoading(false);
        })
    }, [socket , setClient, ids, setTotal])

    const onContinue = () => {
        history.replace('facturas-a-pagar');
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!e.nativeEvent.target.identifier.value){
            message.error("Es necesario ingresar una Cédula-RUC", 2);
            return;
        }
        socket?.emit('search-client', {
            identifier: e.nativeEvent.target.identifier.value
        })

        setIsLoading(true);
            
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
                    placeholder="CI / RUC"
                    className="container-data-payment-input-design
                        container-customer-input-text"
                />
                <Spin spinning={isLoading}>
                    <button
                        type="submit"
                    >
                        CONSULTAR
                    </button>
                </Spin>
            </div>
            <div className="container-query-data-input">
                <label>Total a pagar: {total} </label>
                <button
                    onClick={onContinue}
                    disabled={ids.length===0} 
                >
                    Continuar
                </button>
            </div>
        </form>
    )
}
