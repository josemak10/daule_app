import React, { useContext, useEffect, useState } from 'react';

import { ContainerTotal } from '../components/ContainerTotal';
import { ContainerCustomer } from '../components/ContainerCustomer';
import { AllContext } from '../context/AllContext';
import { useHistory } from 'react-router-dom';


export const Invoice = () => {

    const history = useHistory();
    const { allState } = useContext( AllContext );
    const { invoices } = allState;
    const [total, setTotal] = useState(0);
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        let temp = 0;
        if ( invoices ) {
            invoices.forEach(invoice => temp += invoice.totalTarifa )
        }
        setTotal( temp );
    }, [invoices])

    const toReturn = () => {
        history.replace('/facturas-a-pagar');
    }

    // const toNext = () => {
        // history.replace('datos-pago');
    // }

    return (
        <div className="container-style">
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
                <label
                    className="container-total-data-text-total text-font"
                >
                    Total a pagar: {total.toFixed(2)}
                </label>
                <label
                    className='text-font text-white'
                >
                    GADM DAULE
                </label>
            </div>
            <ContainerCustomer total={total} invoices={invoices} isDone={isDone} />
            <ContainerTotal total={total} setIsDone={setIsDone} isDone={isDone} />
        </div>
    )
}
