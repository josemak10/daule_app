import React, { useContext } from 'react';
import { Tag } from 'antd';
import { AllContext } from '../context/AllContext';

import { getColorByModule } from '../helpers/colorByModule';

import img_cart_remove from '../assets/close-box-outline.png';
import img_uncheck from '../assets/checkbox-blank-outline.png';
import img_check from '../assets/checkbox-marked-outline.png';


export const TableData = ({ invoice, actionButton, action = 1, index }) => {

    const { allState } = useContext( AllContext );
    const { ids } = allState;   

    return (
        <div className="container-list-data-global">
            <Tag
                color={ getColorByModule(invoice.idModulo) }
                className="table-data-text"
            >{invoice.modulo}</Tag>
            <div
                className={`container-list-data ${( (index % 2) === 0 ) && 'invoice-selected'}`}
            >
                <div
                    className="container-list-data-block1"
                >
                    <div className="container-table-data-firt-row">
                    <label
                        className="table-data-text table-data-text-oblique"
                    > 
                        {invoice.apellido + ' ' + invoice.nombre + ' - ' + invoice.cedula} 
                    </label>
                        <label
                            className="table-data-text"
                        > Referencia:  {invoice.referencia} </label>
                    </div>

                    
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
                                src={(action===2) 
                                    ? img_cart_remove 
                                    : (ids.includes(invoice.id)
                                        ? img_check
                                        : img_uncheck)}
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
        </div>
    )
}
