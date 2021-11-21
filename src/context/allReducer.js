import { types } from "../types/types";

export const allReducer = ( state, action ) => {
    switch (action.type) {

        case types.addInvoice:
            let invoices = []
            let invoice_ids = []
            action.payload.forEach(invoice => {
                if ( !state.ids.includes(invoice.id) ) {
                    invoices.push( invoice );
                    invoice_ids.push( invoice.id );
                }
            })

            return {
                ids: [...state.ids, ...invoice_ids],
                invoices: [...state.invoices, ...invoices]
            }

        case types.removeInvoice:
            let invoices_delete = []
            let invoices_delete_ids = []
            state.invoices.forEach(invoice => {
                if ( !action.payload.includes(invoice.id) ) {
                    invoices_delete.push( invoice );
                    invoices_delete_ids.push( invoice.id );
                }
            })

            return {
                ids: invoices_delete_ids,
                invoices: invoices_delete
            }

        default:
            return state;
    }

}