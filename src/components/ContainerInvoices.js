import React, { useContext, useEffect, useState } from 'react';
import { List } from 'antd';
import { AllContext } from '../context/AllContext';
import { selectionGeneral } from '../types/selectionGeneral';
import { types } from '../types/types';
import { TableData } from './TableData';

export const ContainerInvoices = () => {

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
        <div className="container-style container-query container-color-invoices" >
            <label className="container-invoice-data-title">Facturas a pagar</label>
            <List
                className="container-invoice-data-list"
                dataSource={ client.data }
                renderItem={ invoice => (
                    <List.Item>
                        <TableData
                            invoice={invoice}
                            actionButton={removeInvoice}
                            action={2}
                        />
                    </List.Item>
                ) }
            >
            </List>
        </div>
    )
}
