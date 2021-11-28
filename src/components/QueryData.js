import React, { useContext, useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { notification, Spin } from 'antd';
import { SocketContext } from '../context/SocketContext';
import { AllContext } from '../context/AllContext';


export const QueryData = ({ setClient }) => {
 
    const { allState } = useContext( AllContext );
    const { ids } = allState;
    const { socket } = useContext(SocketContext);
    const ref = useRef();
    const [captchaValidate, setCaptchaValidate] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        socket?.on('search-client', (data) => {
            if (!data || data.length <= 0) {
                notification['info']({
                    message: 'Consulta de deuda',
                    description: 'No contiene deuda'
                })
                setClient({
                    name: '',
                    data: [],
                })
            } else {
                setClient({
                    name: data[0].apellido + ' ' + data[0].nombre,
                    data: data.filter(row => !ids.includes(row.id)),
                })
            }
            setIsLoading(false);
        })
    }, [socket , setClient, ids])

    const onChange = () => {
        if ( ref.current.getValue() ) {
            setCaptchaValidate(true);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if ( ref.current.getValue() ) {
            setCaptchaValidate(true);
            if (!e.nativeEvent.target.identifier.value){
                notification['error']({
                    message: 'Error',
                    description: 'Es necesario ingresar una Cédula-RUC'
                })
                return;
            }
            socket?.emit('search-client', {
                identifier: e.nativeEvent.target.identifier.value
            })

            setIsLoading(true);
            
        } else {
            setCaptchaValidate(false);
        }
    }

    return (
        <form
            className="container-query-data"
            onSubmit={onSubmit}
        >
            <div className="container-query-data-input">
                <div
                    className="container-query-data-input-text"
                >Ingrese CI/RUC</div
                >
                <input
                    type="text"
                    name="identifier"
                    id="identifier"
                    placeholder="CI / RUC"
                    className="container-data-payment-input-design
                        container-customer-input-text"
                />
            </div>
            <div className="container-query-data-recaptcha">
                <div>
                    <ReCAPTCHA
                        ref={ref}
                        sitekey={process.env.REACT_APP_KEY_CAPTCHA}
                        onChange={onChange}
                    />
                    { captchaValidate===false && (
                        <div
                            className="text-captcha-required"
                        >Por favor acepta el captcha</div>
                    )}
                </div>
                <Spin spinning={isLoading}>
                    <button
                        type="submit"
                    >
                        CONSULTAR
                    </button>
                </Spin>
            </div>
        </form>
    )
}
