import React, { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { ContainerLogo } from './ContainerLogo';

import img_next from '../assets/chevron-right-black.png';

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
        <div className="container-home">
            <ContainerLogo />
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
            > 
                Continuar
                <img
                    src={img_next}
                    alt="next"
                    width="22px"
                    height="22px"
                />
            </button>
        </div>
    )
}
