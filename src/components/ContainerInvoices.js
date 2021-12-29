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
        <div className="container-style" >
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
                >Total a pagar: $ {total} </label>
                <button
                    onClick={toNext}
                    disabled={invoices.length===0}
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
            <List
                className="container-invoice-data-list"
                dataSource={ client.data }
                renderItem={ (invoice, index) => (
                    <List.Item>
                        <TableData
                            invoice={invoice}
                            actionButton={removeInvoice}
                            action={2}
                            index={index}
                        />
                    </List.Item>
                ) }
            >
            </List>
        </div>
    )
}
