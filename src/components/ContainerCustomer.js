import React, { useContext, useState } from 'react';
import { message, Modal, Spin } from 'antd';
import { DataPayment } from './DataPayment';
import { getDataToPay } from '../helpers/datatoPay';
import { SocketContext } from '../context/SocketContext';
import { validateEmail } from '../helpers/validateEmail';

import img_customer from '../assets/shield-account-black.png';
import img_payment from '../assets/currency-usd-black.png';

const urlPayment = process.env.REACT_APP_API_PAYMENT;


export const ContainerCustomer = ({ total, invoices, isDone }) => {

    const { ip } = useContext( SocketContext );
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState({
        tipo_doc: '',
        cedula: '',
        apellido: '',
        nombre: '',
        email: '',
        celular: '',
    })
    const [dataTemp, setDataTemp] = useState({
        tipo_doc: '',
        cedula: '',
        apellido: '',
        nombre: '',
        email: '',
        celular: '',
    })

    var getBrowserInfo = () => {
        var ua= navigator.userAgent, tem, 
        M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if(/trident/i.test(M[1])){
            tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
            return 'IE '+(tem[1] || '');
        }
        if(M[1]=== 'Chrome'){
            tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
            if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
        }
        M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
        if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
        return M.join(' ');
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if ( total <= 19 ){
            message.error('No se puede hacer un pago menor a $20', 2);
            return;
        }
        const body = getDataToPay(
            data,
            invoices,
            total,
            ip,
            getBrowserInfo()
        );
        const xhr = new XMLHttpRequest();
        xhr.open(
            "POST",
            urlPayment
        )
        message.loading('Espere unos segundos mientras se carga la pagina', 2);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () {
            if ( xhr.readyState===4) {
                const url = xhr.responseText;
                window.open(url, "_self", 'noopener,noreferrer');
            }
            setIsLoading(false);
        }
        xhr.send( JSON.stringify(body) );
        setIsLoading(true);
    }

    const onClick = (e) => {
        e.preventDefault();
        setIsOpen( true );
    }

    const handleOk = () => {
        if ( dataTemp.tipo_doc === '' || dataTemp.cedula === '' ||
                dataTemp.apellido === '' || dataTemp.email==='' || dataTemp.telefono==='' ) {
            message.error('Todos los campos son requeridos', 2);
        } else if (dataTemp.tipo_doc!=='RUC' && dataTemp.nombre==='') {
            message.error('Todos los campos son requeridos', 2);
        } else {
            const v_text_space = /^[a-zA-Z\u00f1\u00d1áéíóúÁÉÍÓÚ\s]*$/;
            const v_text_space_number = /^[a-zA-Z0-9\u00f1\u00d1áéíóúÁÉÍÓÚ\s]*$/;
            if ( dataTemp.tipo_doc!=='RUC' && (!v_text_space.test(dataTemp.nombre) || !v_text_space.test(dataTemp.apellido)) ) {
                message.error("El campo nombre y apellido no se aceptan números y/o caracteres especiales", 3);
            } else if ( dataTemp.tipo_doc==='RUC' && (!v_text_space_number.test(dataTemp.nombre) || !v_text_space_number.test(dataTemp.apellido)) ) {
                message.error("El campo Razón Social no se aceptan caracteres especiales", 3);
            } else if ( dataTemp.tipo_doc==='CI' && dataTemp.cedula.length !== 10 ) {
                message.error("La CI esta mal tipeada", 2);
            } else if ( dataTemp.tipo_doc==='RUC' && dataTemp.cedula.length !== 13 ) {
                message.error("El RUC esta mal tipeado", 2);
            } else if ( dataTemp.celular.length < 8 || dataTemp.celular.length > 30 ) {
                message.error("El número debe tener más de 8 y menos de 30 caracteres", 2);
            } else if ( !validateEmail(dataTemp.email) ){
                message.error("Email incorrecto", 2);
            }
            else { 
                setData(dataTemp);   
                setIsOpen(false);
            }
        } 
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    return (
        <form
            className="container-customer"
        >
            <label
                className="container-customer-data-text"
            >
                Tipo Identificador</label>
            <input
                id="tipo_doc"
                name="tipo_doc"
                placeholder="CI / RUC"
                disabled
                value={ data.tipo_doc }
                className="container-data-payment-input-design
                    container-customer-input-text
                    container-customer-input-text-size"
            />
            <label
                className="container-customer-data-text"
            >
                Identificador</label>
            <input
                id="cedula"
                name="cedula"
                placeholder="0000000000"
                type="number"
                disabled
                value={ data.cedula }
                className="container-data-payment-input-design
                    container-customer-input-text
                    container-customer-input-text-size"
            />
            { 
                ( data.tipo_doc==='RUC' ) 
                    ? <label 
                        className="container-customer-data-text"
                        > Razón Social </label> 
                    : <label 
                        className="container-customer-data-text"
                        > Apellido </label> 
            }
            <input
                id="apellido"
                name="apellido"
                placeholder={ ( data.tipo_doc==='RUC' ) 
                                    ? "Razón Social" 
                                    : "Apellido" }
                type="text"
                disabled
                value={ data.apellido }
                className="container-customer-input-text
                    container-customer-input-text-size
                    container-data-payment-input-design"
            />
            {
                ( data.tipo_doc!=='RUC' ) && (
                    <>
                        <label
                            className="container-customer-data-text"
                        > 
                            Nombre </label>
                        <input
                            id="nombre"
                            name="nombre"
                            placeholder="Nombre"
                            type="text"
                            disabled
                            value={ data.nombre }
                            className="container-customer-input-text
                                container-customer-input-text-size
                                container-data-payment-input-design"
                        />
                    </>
                )
            }
            <label
                className="container-customer-data-text"
            > 
                Email </label>
            <input
                id="email"
                name="email"
                placeholder="Email"
                type="email"
                value={ data.email }
                disabled
                className="container-customer-input-text-email
                    container-data-payment-input-design
                    container-customer-input-text-size"
            />
                
            <label
                className="container-customer-data-text"
            > 
                Teléfono </label>
            <input
                id="celular"
                name="celular"
                placeholder="Telefono"
                type="number"
                value={ data.celular }
                disabled
                className="container-data-payment-input-design
                    container-customer-input-text
                    container-customer-input-text-size"
            />
            <br />
            <button
                onClick={onClick}
            >
                Registrar datos para el pago
                <img
                    src={img_customer}
                    alt="next"
                    width="22px"
                    height="22px"
                />
            </button>
            <div>
                {
                    (invoices.length > 0 && data.cedula!=='' && isDone) && (
                        <>
                            <Spin spinning={isLoading}>
                                <button
                                    onClick={ onSubmit }
                                    disabled={invoices.length===0}
                                >
                                    Pagar
                                    <img
                                        src={img_payment}
                                        alt="payment"
                                        width="22px"
                                        height="22px"
                                    />
                                </button>   
                            </Spin>

                        </>
                    )
                }
            </div>
            <Modal
                title="Ingrese datos para el pago"
                visible={isOpen}
                onOk={ handleOk }
                onCancel={ handleCancel }
            >
                <DataPayment data={dataTemp} setData={setDataTemp} />
            </Modal>
        </form>
    )
}
