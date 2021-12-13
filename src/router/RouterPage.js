import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
  } from 'react-router-dom';
import { ContainerInvoices } from '../components/ContainerInvoices';
import { ContainerQueryData } from '../components/ContainerQueryData';
import { HistoryRename } from '../pages/HistoryRename';
import { Invoice } from '../pages/Invoice';

export const RouterPage = () => {

    return (
        <Router>
            <div className="container-principal">
                <Switch>
                    <Route exact path="/pagos-en-linea" component={ContainerQueryData} />
                    <Route exact path="/facturas-a-pagar" component={ContainerInvoices} />
                    <Route exact path="/datos-pago" component={Invoice} />
                    <Route exact path="/historial-transacciones" component={HistoryRename} />
                    <Redirect to="/pagos-en-linea" />
                </Switch>
            </div>
        </Router>
    )
}
