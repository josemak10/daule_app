import React, { useContext, useState } from 'react';
import { UsergroupAddOutlined } from '@ant-design/icons';
import { message, Modal } from 'antd';
import { DataPayment } from './DataPayment';
import { getDataToPay } from '../helpers/datatoPay';
import { SocketContext } from '../context/SocketContext';
import { validateEmail } from '../helpers/validateEmail';

import img_currency_usd from '../assets/currency-usd.png';
import img_transfer_right from '../assets/transfer-right.png';


export const ContainerCustomer = ({ total, invoices, isDone }) => {

    const { ip } = useContext( SocketContext );
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

    const onSubmit = (e) => {
        e.preventDefault();
        const body = getDataToPay(
            data,
            invoices,
            total,
            ip
        );
        const xhr = new XMLHttpRequest();
        xhr.open(
            "POST",
            "https://siim.daule.gob.ec:9443/place2/cgi-bin/pay.php"
        )
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () {
            if ( xhr.readyState===4) {
                const url = xhr.responseText;
                window.open(url, "_self", 'noopener,noreferrer');
            }
        }
        xhr.send( JSON.stringify(body) );
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
            const v_text_space = /^[a-zA-Z\s]*$/;
            if ( !v_text_space.test(dataTemp.nombre) || !v_text_space.test(dataTemp.apellido) ) {
                message.error("El campo nombre y apellido no se aceptan números y/o caracteres especiales", 3);
            } else if ( dataTemp.tipo_doc==='CI' && dataTemp.cedula.length !== 10 ) {
                message.error("La CI esta mal tipeada", 2);
            } else if ( dataTemp.tipo_doc==='RUC' && dataTemp.cedula.length !== 13 ) {
                message.error("El RUC esta mal tipeado", 2);
            } else if ( dataTemp.tipo_doc==='RUC' && dataTemp.cedula.length !== 13 ) {
                message.error("El RUC esta mal tipeado", 2);
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
            className="container-style container-customer container-color-data-payment"
        >
            <div>
                {
                    (invoices.length > 0 && data.cedula!=='' && isDone) && (
                        <>
                            <label
                                style={{
                                    fontSize: 17,
                                    fontWeight: 600,
                                }}
                            >Pagar</label>
                            <img
                                src={img_currency_usd}
                                alt="img_payment"
                                width="30px"
                                height="30px"
                                type="button"
                                onClick={ onSubmit }
                            />
                        </>
                    )
                }
                <label
                    style={{
                        fontSize: 17,
                        fontWeight: 600,
                        marginLeft: '70px'
                    }}
                >Pulsar</label>
                <img
                    src={img_transfer_right}
                    alt="transfer"
                    width="30px"
                    height="30px"
                    style={{
                        fontSize: 25, 
                        color:'navy',
                        marginLeft: '10px'
                    }}
                />
                <UsergroupAddOutlined
                    type="button"
                    style={{
                        fontSize: 28, 
                        color:'navy',
                        marginLeft: '10px'
                    }}
                    onClick={ onClick }
                />
            </div>
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
                className="container-customer-input-text
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
