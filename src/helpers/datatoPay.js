import { v4 } from 'uuid';


export const getDataToPay = (data, invoices, total, ip) => {

    let ids_facturas = []
    invoices.forEach(invoice => {
        ids_facturas.push(invoice.id);
    });

    const referencia = v4();

    return {
        celular: data.celular.value,
        apellido: data.apellido.value,
        nombre: data.nombre.value,
        email: data.email.value,
        cedula: data.cedula.value,
        tipo_doc: data.tipo_doc.value,
        total: total.total,
        ids_facturas: ids_facturas.toString(),
        ip_cliente: ip,
        referencia: referencia.substring(0, 32),
        base_ice: '',
        ice_amount: '',
        base_iva: '',
        iva_percent: '',
    };
}