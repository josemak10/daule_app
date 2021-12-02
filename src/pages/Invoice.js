import React, { useContext, useEffect, useState } from 'react';

import { ContainerLogo } from '../components/ContainerLogo';
import { ContainerTotal } from '../components/ContainerTotal';
import { ContainerCustomer } from '../components/ContainerCustomer';
import { ContainerQueryData } from '../components/ContainerQueryData';
import { ContainerInvoices } from '../components/ContainerInvoices';
import { ImgPayment } from '../components/ImgPayment';
import { AllContext } from '../context/AllContext';
import { useHistory } from 'react-router-dom';

export const Invoice = () => {

    const history = useHistory();
    const { allState } = useContext( AllContext );
    const { invoices } = allState;
    const [total, setTotal] = useState(0);
    const [isDone, setIsDone] = useState(false);
    const [client, setClient] = useState({
        name: '',
        data: [],
    })

    useEffect(() => {
        setClient({
            name: '',
            data: [],
        })
    }, [])

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

    const toNext = () => {
        // history.replace('datos-pago');
    }

    return (
        <div className="container-principal">
            {/* <ContainerQueryData  /> */}
            {/* <ContainerLogo className="container-logo-title" />
            <ImgPayment className="container-img-payment"/>
            <div className="container-block">
                <ContainerQueryData client={client} setClient={setClient} />
                <ContainerInvoices /> */}
            <div className="container-query-data-input">
                <button
                    // className="container-invoice-data-title"
                    onClick={toReturn}
                >Regresar</button>
                <label>Total a pagar: {total} </label>
                <button
                    // className="container-invoice-data-title"
                    onClick={toNext}
                    disabled={invoices.length===0}
                >Pagar</button>
            </div>
            <div className="container-style container-query">
                <ContainerTotal total={total} setIsDone={setIsDone} isDone={isDone} />
                <br />
                <ContainerCustomer total={total} invoices={invoices} isDone={isDone} />
            </div>
            {/* </div>  */}
        </div>
    )
}
