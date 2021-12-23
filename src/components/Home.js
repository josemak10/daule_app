import React, { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import img_home from '../assets/image_home.png';

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
        <div className="container-home-temp">
            <img
                src={ img_home }
                alt="Imagen de inicio"
                width="50%" 
                height="50%" 
            />
            <div className="container-home">
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
                    disabled={ !captchaValidate }
                    onClick={ onClick }
                    className="container-button-home text-font"
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
