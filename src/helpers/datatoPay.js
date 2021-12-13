import { v4 } from 'uuid';


export const getDataToPay = (data, invoices, total, ip) => {

    var dict_customer = {};
    let ids_facturas = [];
    let base_iva = 0.0;
    invoices.forEach(invoice => {
        dict_customer[invoice.cedula] = true;
        ids_facturas.push(invoice.id);
        invoice.facturaDetalles.forEach(detalle => {
            if (detalle.rubroDescripcion.toUpperCase()==='IVA'){
                base_iva += detalle.cantidad * detalle.valorUnitario;
            }
        })
    });

    const referencia = v4();

    return {
        celular: data.celular,
        apellido: data.apellido,
        nombre: data.nombre,
        email: data.email,
        cedula: data.cedula,
        tipo_doc: data.tipo_doc,
        total: total,
        ids_facturas: ids_facturas.toString(),
        ids_clientes: Object.keys(dict_customer).toString(),
        ip_cliente: ip,
        referencia: referencia.substring(0, 32),
        base_ice: 0,
        ice_amount: 0,
        base_iva: base_iva.toFixed(2),
        iva_percent: 12,
    };
}