import React, { useContext, useEffect, useState } from 'react';

import { ContainerTotal } from '../components/ContainerTotal';
import { ContainerCustomer } from '../components/ContainerCustomer';
import { AllContext } from '../context/AllContext';
import { useHistory } from 'react-router-dom';

import img_return from '../assets/chevron-left-black.png';

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
                >
                    <img
                        src={img_return}
                        alt="next"
                        width="22px"
                        height="22px"
                    />
                    Regresar
                </button>
                <label
                    className="container-total-data-text-total"
                >
                    Total a pagar: {total.toFixed(2)}
                </label>
                <label
                    // onClick={toNext}
                    // disabled={invoices.length===0}
                >
                    GADM Daule
                    {/* <img
                        src={img_next}
                        alt="next"
                        width="22px"
                        height="22px"
                    /> */}
                </label>
            </div>
            <ContainerCustomer total={total} invoices={invoices} isDone={isDone} />
            <ContainerTotal total={total} setIsDone={setIsDone} isDone={isDone} />
        </div>
    )
}
