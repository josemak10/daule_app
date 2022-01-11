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

    return (
        <div>
            <div className="row justify-content-between after-component before-component">
                <button
                    onClick={toReturn}
                    className="col-auto col-md-2 container-button text-font"
                >
                    Regresar
                </button>
                <label
                    className="col-auto container-total-data-text-total text-font"
                >
                    Total a pagar: {total.toFixed(2)}
                </label>
                <label
                    className='col-0 col-sm-2 text-font text-white'
                >
                    D
                </label>
            </div>
            <ContainerCustomer total={total} invoices={invoices} isDone={isDone} />
            <ContainerTotal total={total} setIsDone={setIsDone} isDone={isDone} />
        </div>
    )
}
