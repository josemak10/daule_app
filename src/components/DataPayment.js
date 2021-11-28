import React, { useState } from 'react';


export const DataPayment = ({ data, setData }) => {

    const [typeIdentifier, setTypeIdentifier] = useState('CI');

    const onChange = ({ nativeEvent }) => {
        setData({
            ...data,
            [nativeEvent.target.name]: nativeEvent.target.value,
        })
        if ( nativeEvent.target.name==='tipo_doc' ) {
            setTypeIdentifier(nativeEvent.target.value);
        }
    }

    return (
        <form
            className="container-data-payment-modal"
        >
            <div className="container-customer-data-text">
                <label
                    className="container-customer-data-label"
                >
                    Tipo de Identificador</label>
                <select
                    id="tipo_doc"
                    name="tipo_doc"
                    onChange={ onChange }
                    className="container-customer-data-label-input
                        container-data-payment-input-design"
                >
                    <option value="" ></option>
                    <option value="CI" >CI</option>
                    <option value="RUC" >RUC</option>
                    <option value="PPN" >Pasaporte</option>
                </select>
            </div>
            <div className="container-customer-data-text">
                <label
                    className="container-customer-data-label"
                >
                    Identificador</label>
                <input
                    id="cedula"
                    name="cedula"
                    placeholder="CI / RUC"
                    type="number"
                    onChange={ onChange }
                    maxLength={(typeIdentifier==='CI') ? '9' : (typeIdentifier==='RUC') ? '13' : '20' }
                    minLength={(typeIdentifier==='CI') ? '9' : (typeIdentifier==='RUC') ? '13' : '20' }
                    required
                    className="container-customer-data-label-input
                        container-data-payment-input-design"
                />
            </div>
            <div className="container-customer-data-text">
                { 
                    ( typeIdentifier==='RUC' ) 
                        ? <label 
                            className="container-customer-data-label"
                            > Razón Social </label> 
                        : <label 
                            className="container-customer-data-label"
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
                    onChange={ onChange }
                    className="container-customer-data-label-input
                        container-data-payment-input-design"
                />
   
            </div>
            {
                ( typeIdentifier!=='RUC' ) && (
                    <div className="container-customer-data-text">
                        <label
                            className="container-customer-data-label"
                        > 
                            Nombre </label>
                        <input
                            id="nombre"
                            name="nombre"
                            placeholder="Nombre"
                            type="text"
                            onChange={ onChange }
                            required={ typeIdentifier!=='RUC' }
                            className="container-customer-data-label-input
                                container-data-payment-input-design"
                        />
                    </div>
                )
            }
            
            <div className="container-customer-data-text">
                <label
                    className="container-customer-data-label"
                > 
                    Email </label>
                <input
                    id="email"
                    name="email"
                    placeholder="Email"
                    type="email"
                    required
                    onChange={ onChange }
                    className="container-customer-data-label-input
                        container-data-payment-input-design"
                />
                
            </div>
            <div className="container-customer-data-text">
                <label
                    className="container-customer-data-label"
                > 
                    Teléfono </label>
                <input
                    id="celular"
                    name="celular"
                    placeholder="Telefono"
                    type="number"
                    required
                    onChange={ onChange }
                    className="container-customer-data-label-input
                        container-data-payment-input-design"
                />
            </div> 
        </form>
    )
}
