import React, { useContext, useEffect, useState } from 'react';
import { notification } from 'antd';
import { useHistory } from 'react-router-dom';

import { validateEmail } from '../helpers/validateEmail';
import { ImgPayment } from './ImgPayment';
import { getDataToPay } from '../helpers/datatoPay';
import { SocketContext } from '../context/SocketContext';


export const DataPayment = ({ client }) => {

    const { ip } = useContext( SocketContext );
    const history = useHistory();
    const [typeIdentifier, setTypeIdentifier] = useState('CI');
    const [isDone, setIsDone] = useState(false);
    const [total, setTotal] = useState({
        tax: 0,
        dto: 0,
        total: 0
    })

    useEffect(() => {
        let temTax = 0;
        let temDto = 0;
        let temTotal = 0;
        if ( client.data ){
            client.data.forEach(row => {
                temTax += row.interes;
                temDto += row.descuentoRecargo;
                temTotal += row.totalTarifa;
            });
        }
        setTotal({
            tax: temTax.toFixed(2),
            dto: temDto.toFixed(2),
            total: temTotal.toFixed(2)
        });
    }, [client])

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = e.nativeEvent.target;
        if ( !validateEmail(data.email.value) ) {
            notification['error']({
                message: 'Email incorrecto',
                description: 'Por favor ingrese un email valido'
            })
            return
        }
        const body = getDataToPay(
            data,
            client.data,
            total,
            ip
        );
        console.log(body);
        fetch(
            'https://siim.daule.gob.ec:9443/place2/cgi-bin/pay.php',
            {
                headers: {
                    'Content-type': 'application/json',
                },
                mode:"no-cors",
                body: JSON.stringify(body),
                method: 'POST'
            }
        )
        .then(async data => {
            const url = await data.text();
            window.open(url, '_blank', 'noopener,noreferrer');

            // const s = document.createElement('script');
            // s.innerHTML = `P.init(${url})`;
        })
    }

    const onChange = () => {
        setIsDone(!isDone);
    }

    const toReturn = () => {
        history.replace('/pagos-en-linea');
    }


    return (
        <form
            onSubmit={onSubmit}
            className="container-data-payment"
        >
            <div className="container-data-payment-identifier">
                <label
                    className="container-data-payment-text"
                >
                    Identificador</label>
                <div className="container-data-payment-type-identifier">
                    <select
                        id="tipo_doc"
                        name="tipo_doc"
                        onClick={e => setTypeIdentifier(e.nativeEvent.target.value)}
                        className="container-data-payment-input-design container-margin-right"
                    >
                        <option value="CI" >CI</option>
                        <option value="RUC" >RUC</option>
                        <option value="PPN" >Pasaporte</option>
                    </select>
                    
                    <input
                        id="cedula"
                        name="cedula"
                        placeholder="CI / RUC"
                        type="number"
                        maxLength={(typeIdentifier==='CI') ? '9' : (typeIdentifier==='RUC') ? '13' : '20' }
                        minLength={(typeIdentifier==='CI') ? '9' : (typeIdentifier==='RUC') ? '13' : '20' }
                        required
                        className="container-data-payment-input-design
                            container-data-payment-input-identifier-design"
                    />
                </div>
            </div>
            <div className="container-data-payment-last-name">
                { 
                    ( typeIdentifier==='RUC' ) 
                        ? <label 
                            className="container-data-payment-text"
                            > Razón Social </label> 
                        : <label 
                            className="container-data-payment-text"
                            > Apellido </label> 
                }
                <input
                    id="apellido"
                    name="apellido"
                    placeholder={ ( typeIdentifier==='RUC' ) 
                                        ? "Razón Social" 
                                        : "Apellido" }
                    type="text"
                    required
                    className="container-data-payment-input-size container-data-payment-input-design"
                />
   
            </div>
            {
                ( typeIdentifier!=='RUC' ) && (
                    <div className="container-data-payment-identifier">
                        <label
                            className="container-data-payment-text"
                        > 
                            Nombre </label>
                        <input
                            id="nombre"
                            name="nombre"
                            placeholder="Nombre"
                            type="text"
                            required={ typeIdentifier!=='RUC' }
                            className="container-data-payment-input-size container-data-payment-input-design"
                        />
                    </div>
                )
            }
            
            <div className="container-data-payment-identifier">
                <label
                    className="container-data-payment-text"
                > 
                    Email </label>
                <input
                    id="email"
                    name="email"
                    placeholder="Email"
                    type="email"
                    required
                    className="container-data-payment-input-size container-data-payment-input-design"
                />
                
            </div>
            <div className="container-data-payment-identifier">
                <label
                    className="container-data-payment-text"
                > 
                    Teléfono </label>
                <input
                    id="celular"
                    name="celular"
                    placeholder="Telefono"
                    type="number"
                    required
                    className="container-data-payment-input-design container-margin-right
                        container-data-payment-input-phone-design"
                />
                <button
                    className="container-data-payment-button-return"
                    onClick={toReturn}
                >
                    REGRESAR
                </button>
            </div>
            <label
                className="text-captcha-required"
            >Al marcar la casilla el usuario acepta los términos y condiciones del servicio.</label>
            <input
                id="done"
                name="done"
                type="checkbox"
                value={isDone}
                onChange={onChange}
            />
            {
                (client.data && client.data.length > 0 && isDone) && (
                    <button
                        type="submit"
                        className="container-margin-right 
                            container-data-payment-button-pay"
                    >
                        PAGAR
                    </button>
                )
            }
            <div className="container-data-payment-total">
                <div>
                    <label
                        className="text-data-payment-label"
                    >T. Interes:</label>
                    <label
                        className="text-data-payment"
                    > {total.tax} </label>
                </div>
                <div>
                    <label
                        className="text-data-payment-label"
                    >T. Dto/Rec:</label>
                    <label
                        className="text-data-payment"
                    > {total.dto} </label>
                </div>
                <div>
                    <label
                        className="text-data-payment-label"
                    >Total:</label>
                    <label
                        className="text-data-payment"
                    > {total.total} </label>
                </div>
            </div>
            <ImgPayment />
        </form>
    )
}
