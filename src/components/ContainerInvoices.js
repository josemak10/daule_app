import React, { useContext, useEffect, useState } from 'react';
import { List } from 'antd';
import { AllContext } from '../context/AllContext';
import { selectionGeneral } from '../types/selectionGeneral';
import { types } from '../types/types';
import { TableData } from './TableData';
import { useHistory } from 'react-router-dom';

export const ContainerInvoices = () => {

    const history = useHistory();
    const { allState, dispatch } = useContext( AllContext );
    const { invoices } = allState;
    const [total, setTotal] = useState(0);

    const [client, setClient] = useState({
        name: '',
        data: invoices,
    })

    useEffect(() => {
        let temp = 0;
        setClient({ 
            name: '',
            data: invoices
        })
        invoices.forEach(invoice => temp += invoice.totalTarifa );
        setTotal(temp.toFixed(2));
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

    const toReturn = () => {
        history.replace('/pagos-en-linea');
    }

    const toNext = () => {
        history.replace('/datos-pago');
    }

    return (
        <div className="container-style container-query container-color-invoices" >
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
                >Continuar</button>
            </div>
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
