import { Tag } from 'antd';
import React, { useContext } from 'react';

import img_cart_plus from '../assets/cart-plus.png';
import img_cart_remove from '../assets/cart-remove.png';
import { AllContext } from '../context/AllContext';
import { getColorByModule } from '../helpers/colorByModule';


export const TableData = ({ invoice, actionButton, action = 1 }) => {

    const { allState } = useContext( AllContext );
    const { ids } = allState;

    return (
        <div
            className={`container-list-data ${(ids.includes(invoice.id)) && ( action===1 ) && 'invoice-selected'}`}
        >
            <div
                className="container-list-data-block1"
            >
                <div className="container-table-data-firt-row">
                    <Tag
                        color={ getColorByModule(invoice.idModulo) }
                        className="table-data-text"
                    >{invoice.modulo}</Tag>
                    <label
                        className="table-data-text"
                    > Referencia:  {invoice.referencia} </label>
                </div>

                <label
                    className="table-data-text table-data-text-oblique"
                > {invoice.apellido + ' ' + invoice.nombre + ' - ' + invoice.cedula} </label>
                <label
                    className="table-data-text-detalle"
                >{invoice.concepto}</label>
            </div>
                        
            <div
                className="container-list-data-block2"
            >
                <label
                    className="container-list-data-block2-total"
                >$ {invoice.totalTarifa}</label>
                {
                    (!invoice.isCoactiva) && (
                        <img
                            src={(action===1) 
                                ? img_cart_plus 
                                : img_cart_remove}
                            alt="cart plus"
                            width="30px"
                            height="30px"
                            style={{
                                cursor: 'pointer',
                            }}
                            onClick={e => actionButton(e, invoice)}
                        />
                    )
                }
            </div>
        </div>
    )
}
