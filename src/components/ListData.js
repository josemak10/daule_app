import React, { useContext } from 'react';
import { message } from 'antd';

import { AllContext } from '../context/AllContext';
import { types } from '../types/types';
import { TableData } from './TableData';
import { selectionGeneral } from '../types/selectionGeneral';

export const ListData = ({ invoice, client, setClient }) => {

    const { dispatch } = useContext( AllContext );

    const addPlus = (e, row) => {
        e.preventDefault();
        const data = selectionGeneral(
            row, client.data, 1
        )
        if (data.temp_invoice.length > 0){
            dispatch({
                type: types.addInvoice,
                payload: data.temp_invoice,
            })
            message.success(
                "Factura añadida", 2);
        
        } else {
            message.warning(
                "No se ha podido agregar facturas por un posible tema de coactivas", 2);
        }
    }

    return (
        <TableData invoice={invoice} actionButton={addPlus} />
    )
}
