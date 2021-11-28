import React, { useContext, useEffect, useState } from 'react'
import { TableData } from '../components/TableData';
import { AllContext } from '../context/AllContext'
import { selectionGeneral } from '../types/selectionGeneral';
import { types } from '../types/types';

export const Payment = () => {

    const { allState, dispatch } = useContext( AllContext );
    const { invoices } = allState;

    const [client, setClient] = useState({
        name: '',
        data: invoices,
    })

    useEffect(() => {
        setClient({ 
            name: '',
            data: invoices
        })
    }, [invoices])

    const removeInvoice = (e, row) => {
        e.preventDefault();
        const data = selectionGeneral(
            row, client.data, 2
        )
        dispatch({
            type: types.removeInvoice,
            payload: data.temp_invoice_ids
        })
    }

    return (
        <div >  
            <TableData client={client} actionButton={removeInvoice} action={2} />
        </div>
    )
}
