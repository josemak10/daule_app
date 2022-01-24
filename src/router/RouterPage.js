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

import img_header from '../assets/header.png';
import img_footer from '../assets/footer.png';

export const RouterPage = () => {

    return (
        <Router>
            <div 
                className="container container-principal"
            >
                <div className='row h-100 justify-content-between'>
                    <div className='col-12 align-items-start header'>
                        <img
                            src={ img_header }
                            alt='header'
                            width="100%"
                            height="auto"
                        />
                    </div>
                    <div className='col-12'>
                        <Switch>
                            <Route exact path="/pagos-en-linea" component={ContainerQueryData} />
                            <Route exact path="/facturas-a-pagar" component={ContainerInvoices} />
                            <Route exact path="/datos-pago" component={Invoice} />
                            <Route exact path="/historial-transacciones" component={HistoryRename} />
                            <Redirect to="/pagos-en-linea" />
                        </Switch>
                    </div>
                    <div className='col-12 align-items-end footer'>
                        <img
                            src={ img_footer }
                            alt='header'
                            width="100%"
                            height="auto"
                        />
                    </div>
                </div>
            </div>
        </Router>
    )
}
