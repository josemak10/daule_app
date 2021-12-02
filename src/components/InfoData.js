import React, { useContext } from 'react'
import { message, Tag } from 'antd';
import { SocketContext } from '../context/SocketContext';

import img_cart_empty from '../assets/cart-outline.png';
import img_cart from '../assets/cart.png';
import { AllContext } from '../context/AllContext';
import { useHistory } from 'react-router-dom';


export const InfoData = () => {

    const history = useHistory();
    const { online } = useContext( SocketContext );
    const { allState } = useContext( AllContext );
    const { ids } = allState; 

    const onContinue = () => {
        if (ids.length > 0) {
            history.replace('facturas-a-pagar')
        } else {
            message.info('No ha seleccionado una factura a pagar', 2);
        };
    }

    return (
        <div className="info-data">
            <Tag
                className="item-info-data-online"
                size="small"
                color={(online) ? "green" : "red"}
            > {(online) ? 'Online' : 'Offline'} </Tag>
            <img
                src={(ids && ids.length>0) ? img_cart :img_cart_empty}
                alt="cart"
                width="25%"
                height="25%"
                onClick={onContinue}
                style={{
                    cursor: 'pointer',
                }}
            />
        </div>
    )
}
