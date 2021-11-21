import React from 'react';

import img_logo from '../assets/logo-daule-letras-azules.png';


export const ContainerLogo = () => {
    return (
        <div className="container-logo-title">
            <img
                src={img_logo}
                alt="GADM Daule"
                width="100px"
                height="50px"
            />
            <div
                className="container-title-text"
            >
                Pagos en Línea
            </div>
        </div>
    )
}
