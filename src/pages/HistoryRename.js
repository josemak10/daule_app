import React from 'react'
import { HistoryData } from '../components/HistoryData';

import img_search from '../assets/magnify-black.png';


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
        <div className="container-style">
            <form
                className="container-history"
                onSubmit={ onSubmit }
            >
                <input
                    id="referencia"
                    name="referencia"
                    placeholder="# Transacción"
                    required
                    className="container-data-payment-input-design
                        container-customer-input-text
                        container-customer-input-text-size"
                />
                <button type="submit">
                    Consultar
                    <img
                        src={img_search}
                        alt="next"
                        width="20px"
                        height="20px"
                    />
                </button>
            </form>
            <HistoryData />
        </div>
    )
}
