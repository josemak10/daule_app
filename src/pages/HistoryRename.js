import React from 'react'
import { ContainerLogo } from '../components/ContainerLogo'
import { HistoryData } from '../components/HistoryData';

export const HistoryRename = () => {

    const onSubmit = (e) => {
        e.preventDefault();
        const url = `https://siim.daule.gob.ec:9443/place2/cgi-bin/history.php?ref=${e.nativeEvent.target.referencia.value}`;
        const xhr = new XMLHttpRequest();
        xhr.open(
            "GET",
            url,
            'no-cors'
        )
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () {
            if ( xhr.readyState===4) {
                console.log(xhr.responseText);
            }
        }
        xhr.send();
    }

    return (
        <div className="container-principal">
            <ContainerLogo className="container-logo-title" />
            <form
                className="container-style container-history"
                onSubmit={ onSubmit }
            >
                <label
                    className="container-customer-data-text"
                >
                    # de Transacción</label>
                <input
                    id="referencia"
                    name="referencia"
                    placeholder="# Transacción"
                    required
                    className="container-data-payment-input-design
                        container-customer-input-text
                        container-customer-input-text-size"
                />
                <button type="submit"> Consultar </button>
            </form>
            <HistoryData />
        </div>
    )
}
