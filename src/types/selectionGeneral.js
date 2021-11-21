

export const selectionGeneral = ( invoiceSelect, invoices, action ) => {
    let temp_invoice = [];
    let temp_invoice_ids = [];
    let isCoactiva = false;
    invoices.forEach(invoice => {
        if (
            invoice.idPropietarioEmision===invoiceSelect.idPropietarioEmision &&
            invoice.referencia===invoiceSelect.referencia && 
            invoice.idModulo===invoiceSelect.idModulo 
            ) {
                if (invoice.isCoactiva) {
                    isCoactiva = true;
                }
                if (action===1 && invoice.fechaCreacion<=invoiceSelect.fechaCreacion ){
                    temp_invoice.push(invoice);
                }
                if (action===2 && invoice.fechaCreacion>=invoiceSelect.fechaCreacion ){
                    temp_invoice.push(invoice);
                }
            }
    })
    temp_invoice.forEach(row => temp_invoice_ids.push(row.id));
    if (isCoactiva) {
        temp_invoice = [];
        temp_invoice_ids = [];
    }
    return {temp_invoice, temp_invoice_ids};    
}