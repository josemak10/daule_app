import React from 'react';

import img_cart_plus from '../assets/cart-plus.png';
import img_cart_remove from '../assets/cart-remove.png';


export const TableData = ({ client, actionButton, action = 1 }) => {
    return (
        <div className="container-list-data">
            <div> {client.name} </div>
            <table>
                <thead>
                    <tr>
                        {
                            (action === 2) && (
                                <>
                                    <td
                                        className="list-data-head list-data-head-text"
                                    >
                                        Identificador</td>
                                    <td
                                        className="list-data-head-module list-data-head-text"
                                    >
                                        Nombres completos</td>
                                </>
                            )
                        }

                        <td 
                            className="list-data-head-module list-data-head-text"
                        >
                            Módulo</td>
                        <td className="list-data-head list-data-head-text"
                        >
                            Referencia</td>

                        <td className="list-data-head list-data-head-text"
                        >
                            Interes</td>
                        <td className="list-data-head list-data-head-text"
                        >
                            Dto/Rec</td>
                        <td className="list-data-head list-data-head-text"
                        >
                            Total</td>
                        <td className="list-data-head-detail list-data-head-text"
                        >
                            Detalle</td>
                        <td className="list-data-head list-data-head-text"
                        >...</td>
                    </tr>
                </thead>
                <tbody>
                    {client.data && client.data
                    .sort(function (a, b) {
                        if (a.cedula > b.cedula) {
                            if (a.modulo > b.modulo) {
                                return 1;
                            }
                            if (a.modulo < b.modulo) {
                                return -1;
                            }
                        }
                        if (a.cedula < b.cedula) {
                            if (a.modulo > b.modulo) {
                                return 1;
                            }
                            if (a.modulo < b.modulo) {
                                return -1;
                            }
                        }
                        return 0;
                    })
                    .map((row, index) => (
                        <tr
                            className="list-data-row"
                            key={index}
                        >
                            {
                                (action === 2) && (
                                    <>
                                        <td
                                            className="list-data-row-text"
                                        >
                                            {row.cedula}</td>
                                            <td
                                                className="list-data-row-text"
                                            >
                                                {row.apellido + ' ' + row.nombre}</td>
                                    </>
                                )
                            }
                            
                            <td
                                className="list-data-row-text"
                            >
                                {row.modulo}</td>
                            <td
                                className="list-data-row-text"
                            >
                                {row.referencia}</td>
                            <td
                                className="list-data-row-text"
                            >
                                {(row.interes) ? row.interes : 0} </td>
                            <td
                                className="list-data-row-text"
                            >
                                {row.descuentoRecargo}</td>
                            <td
                                className="list-data-row-text"
                            >
                                {row.totalTarifa}</td>
                            <td
                                className="list-data-row-text"
                            >
                                {row.concepto}</td>
                            <td
                                className="list-data-row-text"
                            >
                                {
                                    (!row.isCoactiva) && 
                                    (
                                        <img
                                            src={(action===1) ? img_cart_plus : img_cart_remove}
                                            alt="cart plus"
                                            width="60%"
                                            height="60%"
                                            onClick={e => actionButton(e, row)}
                                        />
                                    )
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
