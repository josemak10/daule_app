import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
  } from 'react-router-dom';
import { InfoData } from '../components/InfoData';
import { HistoryRename } from '../pages/HistoryRename';
import { Invoice } from '../pages/Invoice';

export const RouterPage = () => {

    return (
        <Router>
            <InfoData />
            <Switch>
                <Route  path="/pagos-en-linea" component={Invoice} />
                <Route  path="/historial-transacciones" component={HistoryRename} />
                <Redirect to="/pagos-en-linea" />
            </Switch>
        </Router>
    )
}
