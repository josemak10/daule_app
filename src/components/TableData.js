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
        <div
            className="row w-100 justify-content-center"
        >
            <div className='col-12 col-lg-2 align-self-center'>
                <Tag
                    color={ getColorByModule(invoice.idModulo) }
                    className="col-auto table-data-text"
                >{invoice.modulo}</Tag>
            </div>
            <div
                className={`col-8 container-list-data ${( (index % 2) === 0 ) && 'invoice-selected'}`}
            >
                <div
                    className="row w-100 justify-content-around"
                >
                    <label
                        className="col-12 col-lg-5 table-data-text table-data-text-oblique"
                    > 
                        {invoice.apellido + ' ' + invoice.nombre + ' - ' + invoice.cedula} 
                    </label>
                    <label
                        className="col-12 col-lg-5 table-data-text"
                    > 
                        Referencia:  {invoice.referencia} 
                    </label>
                    
                    <label
                        className="col-12 table-data-text-detalle"
                    >
                        {invoice.concepto}
                    </label>
                </div>
            </div>
                            
            <div
                className="col-2 container-list-data-block2"
            >
                <div className='row justify-content-center'>
                    <label
                        className="col-12 container-list-data-block2-total"
                    >
                        $ {invoice.totalTarifa}
                    </label>
                    {
                        (!invoice.isCoactiva) && (
                            <img
                                src={(action===2) 
                                    ? img_cart_remove 
                                    : (ids.includes(invoice.id)
                                        ? img_check
                                        : img_uncheck)}
                                alt="cart plus"
                                width="20px"
                                height="20px"
                                className="col-auto col-md-auto"
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
