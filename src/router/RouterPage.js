import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
  } from 'react-router-dom';
import { InfoData } from '../components/InfoData';
import { Invoice } from '../pages/Invoice';
import { Payment } from '../pages/Payment';

export const RouterPage = () => {

    return (
        <Router>
            <InfoData />
            <Switch>
                <Route  path="/pagos-en-linea" component={Invoice} />
                <Route  path="/datos-factura" component={Payment} />
                <Redirect to="/pagos-en-linea" />
            </Switch>
        </Router>
    )
}
