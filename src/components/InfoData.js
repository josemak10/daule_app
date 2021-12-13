import React, { useContext } from 'react'

import img_cart_empty from '../assets/cart-outline.png';
import img_cart from '../assets/cart.png';
import { AllContext } from '../context/AllContext';


export const InfoData = () => {

    const { allState } = useContext( AllContext );
    const { ids } = allState; 

    return (
        <div className="info-data">
            <img
                src={(ids && ids.length>0) ? img_cart :img_cart_empty}
                alt="cart"
                width="25%"
                height="25%"
                // onClick={onContinue}
                // style={{
                //     cursor: 'pointer',
                // }}
            />
        </div>
    )
}
