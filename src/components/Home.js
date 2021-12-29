import React, { useRef, useState } from 'react';
import { message, notification } from 'antd';
import ReCAPTCHA from 'react-google-recaptcha';

import img_home from '../assets/image_home.png';
import { fetchConTocken } from '../helpers/fetch';

const urlPending = process.env.REACT_APP_API_PENDING;


export const Home = ({ setIsCaptcha, setIdentifier, identifier, setClient, setTotal }) => {

    const ref = useRef();
    const [captchaValidate, setCaptchaValidate] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false);

    const onChange = () => {
        if ( ref.current.getValue() ) {
            setCaptchaValidate(true);
        }
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
        setIsDisabled(true)
        const data = await fetchConTocken('deudas', identifier, 'POST');
        let temp = 0;
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
        const xhr = new XMLHttpRequest();
        const url = `${urlPending}=${identifier}`;
        xhr.open(
            "GET",
            url,
            false,
        )
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send();
        if ( xhr.status === 200 ) {
            if ( JSON.parse(xhr.response)[0] ) {
                const args = {
                    message: 'Transacciones pendientes',
                    description: `Este contribuyente tiene transacciones pendientes, 
                        a continuacion las referencias: ${JSON.parse(xhr.response).toString()}`,
                    duration: 0
                }
                notification.info(args);
            }
        }
        setIsCaptcha(true);
    }

    const onChangeInput = ({ nativeEvent }) => {
        setIdentifier(nativeEvent.target.value);
    }

    return (
        <div className="container-home-temp">
            <img
                src={ img_home }
                alt="Imagen de inicio"
                width="40%" 
                height="40%" 
            />
            <div className="container-home">
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
                <div>
                    <div>
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
                <button
                    disabled={ isDisabled }
                    onClick={ onClick }
                    className={`container-button-home text-font ${( isDisabled ) && 'disabled_button' }`}
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
        </div>
    )
}
