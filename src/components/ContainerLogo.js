import React from 'react';

import img_logo from '../assets/logo-daule-letras-azules.png';


export const ContainerLogo = () => {
    return (
        <div className="container-logo-title">
            <img
                src={img_logo}
                alt="GADM Daule"
                width="21%"
                height="100%"
            />
            <div
                className="container-title-text"
            >
                Pagos en Línea
            </div>
        </div>
    )
}
