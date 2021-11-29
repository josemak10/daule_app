import { moduleSIIM } from "../types/modules";

export const getColorByModule = ( idModule ) => {
    let color = "green";
    if ([
        moduleSIIM.ALCABALAS,
        moduleSIIM.RODAJE,
        moduleSIIM.REGISTRO_PROPIEDAD
    ].includes(idModule)) {
        color = "magenta";
    } else if ([
        moduleSIIM.CEMENTERIO,
        moduleSIIM.COMISARIA,
        moduleSIIM.LICENCIA_FUNCIONAMIENTO
    ].includes(idModule)) {
        color = "red";
    } else if ([
        moduleSIIM.CATASTRO_URBANO,
        moduleSIIM.BOMBEROS,
        moduleSIIM.CERTIFICACIONES
    ].includes(idModule)) {
        color = "volcano";
    } else if ([
        moduleSIIM.CATASTRO_RURAL,
        moduleSIIM.BOMBEROS_IMPUESTO,
        moduleSIIM.CANCHAS
    ].includes(idModule)) {
        color = "orange";
    } else if ([
        moduleSIIM.PLUSVALIA,
        moduleSIIM.RASTROS,
        moduleSIIM.ESPECTACULOS
    ].includes(idModule)) {
        color = "gold";
    } else if ([
        moduleSIIM.AGUA,
        moduleSIIM.FACTURACION,
        moduleSIIM.FORMULARIOS
    ].includes(idModule)) {
        color = "blue";
    } else if ([
        moduleSIIM.SERVICIOS_AGUA,
        moduleSIIM.MEJORAS,
        moduleSIIM.PATENTES
    ].includes(idModule)) {
        color = "geekblue";
    } else if ([
        moduleSIIM.TRAMITE,
        moduleSIIM.PLANIFICACION,
        moduleSIIM.ARRIENDO
    ].includes(idModule)) {
        color = "purple";
    }
    return color;
}