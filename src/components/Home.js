import React, { useRef, useState } from 'react';
import { message, notification, Spin } from 'antd';
import ReCAPTCHA from 'react-google-recaptcha';

import img_home from '../assets/image_home.png';

const urlPending = process.env.REACT_APP_API_PENDING;
const baseUrl = process.env.REACT_APP_API_URL;
const token = process.env.REACT_APP_KEY_ACCESTOKEN;


export const Home = ({ setIsCaptcha, setIdentifier, identifier, setClient, setTotal }) => {

    const ref = useRef();
    const [captchaValidate, setCaptchaValidate] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false);
    const xhr = new XMLHttpRequest();

    const onChange = () => {
        if ( ref.current.getValue() ) {
            setCaptchaValidate(true);
        }
    }

    const getInvoices = () => {
        if ( xhr.status === 200 ) {
            let temp = 0;
            const data = JSON.parse( xhr.response );
            if (!data || data.length <= 0) {
                message.info("No contiene deuda", 2);
                setClient({
                    name: '',
                    data: [],
                });
            } else {
                setClient({
                    name: data[0].apellido + ' ' + data[0].nombre,
                    data: data,
                })
                data.forEach(invoice => temp += invoice.totalTarifa );
            }
            setTotal(temp.toFixed(2));
        }
        setIsCaptcha(true);
        setIsDisabled(false);
    }

    const onClick = async (e) => {
        e.preventDefault();
        if ( identifier===null || identifier==='' ) {
            message.error('Ingrese una CI / RUC', 2);
            return;
        } else if ( !captchaValidate ) {
            message.error('Por favor acepta el captcha', 2);
            return;
        }
        setIsDisabled(true);

        xhr.open(
            'POST',
            baseUrl,
        )
        xhr.addEventListener("load", getInvoices);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.setRequestHeader("Accesstoken", token);
        xhr.send( identifier );
        
        const xhr1 = new XMLHttpRequest();
        const url = `${urlPending}=${identifier}`;
        xhr1.open(
            "GET",
            url,
            false,
        )
        xhr1.setRequestHeader("Content-type", "application/json");
        xhr1.send();
        if ( xhr1.status === 200 ) {
            if ( JSON.parse(xhr1.response)[0] ) {
                const args = {
                    message: 'Transacciones pendientes',
                    description: `Este contribuyente tiene transacciones pendientes, 
                        a continuacion las referencias: ${JSON.parse(xhr1.response).toString()}`,
                    duration: 0
                }
                notification.info(args);
            }
        }
    }

    const onChangeInput = ({ nativeEvent }) => {
        setIdentifier(nativeEvent.target.value);
    }

    return (
        <div className="row justify-content-around" >
            <div className='col-12 col-md-5'>
                <img
                    src={ img_home }
                    alt="Imagen de inicio"
                    width="100%" 
                    height="auto" 
                />
            </div>
            <div className='col-12 col-md-5 align-self-center'>
                <div className='row justify-content-center after-component'>
                    <div className='col-auto col-md-auto'>
                        <input
                            type="text"
                            name="identifier"
                            id="identifier"
                            required
                            placeholder="CI / RUC"
                            onChange={onChangeInput}
                            className="container-data-payment-input-design
                                container-customer-input-text"
                        />
                    </div>
                </div>
                <div className='row justify-content-center after-component'>
                    <div className='col-auto col-md-auto'>
                        <ReCAPTCHA
                            ref={ref}
                            sitekey={process.env.REACT_APP_KEY_CAPTCHA}
                            onChange={onChange}
                        />
                        { captchaValidate===false && (
                            <div
                                className="text-captcha-required text-font"
                            >Por favor acepta el captcha</div>
                        )}
                    </div>
                </div>
                <div className='row justify-content-center after-component'>
                    <div className='col-auto col-md-auto'>
                        <Spin
                            spinning={ isDisabled }
                            tip="Cargando ..."
                            className="spin"
                        >
                            <button
                                disabled={ isDisabled }
                                onClick={ onClick }
                                className='container-button-home text-font'
                            > 
                                Continuar
                            </button>
                        </Spin>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
