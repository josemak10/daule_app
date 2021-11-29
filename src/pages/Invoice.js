import React, { useContext, useEffect, useState } from 'react';

import { ContainerLogo } from '../components/ContainerLogo';
import { ContainerTotal } from '../components/ContainerTotal';
import { ContainerCustomer } from '../components/ContainerCustomer';
import { ContainerQueryData } from '../components/ContainerQueryData';
import { ContainerInvoices } from '../components/ContainerInvoices';
import { ImgPayment } from '../components/ImgPayment';
import { AllContext } from '../context/AllContext';

export const Invoice = () => {

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

    return (
        <div className="container-principal">
            <ContainerLogo className="container-logo-title" />
            <ImgPayment className="container-img-payment"/>
            <div className="container-block">
                <ContainerQueryData client={client} setClient={setClient} />
                <ContainerInvoices />
                <div className="container-block1">
                    <ContainerTotal total={total} setIsDone={setIsDone} isDone={isDone} />
                    <br />
                    <ContainerCustomer total={total} invoices={invoices} isDone={isDone} />
                </div>
            </div>
        </div>
    )
}
