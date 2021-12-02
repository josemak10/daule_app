import React, { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export const Home = ({ setIsCaptcha }) => {

    const ref = useRef();
    const [captchaValidate, setCaptchaValidate] = useState(null);

    const onChange = () => {
        if ( ref.current.getValue() ) {
            setCaptchaValidate(true);
        }
    }

    const onClick = () => {
        setIsCaptcha(true);
    }

    return (
        <div>
            <label className="container-query-data">
                Bienvenido a Pagos en Línea
            </label>
            <div className="container-query-data-recaptcha">
                <div>
                    <ReCAPTCHA
                        ref={ref}
                        sitekey={process.env.REACT_APP_KEY_CAPTCHA}
                        onChange={onChange}
                        // size="compact"
                    />
                    { captchaValidate===false && (
                        <div
                            className="text-captcha-required"
                        >Por favor acepta el captcha</div>
                    )}
                </div>
            </div>
            <button
                disabled={ !captchaValidate }
                onClick={ onClick }
            > 
                Continuar 
            </button>
        </div>
    )
}
