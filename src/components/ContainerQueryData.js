import React, { useContext, useEffect, useState } from 'react';
import { List } from 'antd';
import { QueryData } from './QueryData';
import { ListData } from './ListData';
import { Home } from './Home';
import { AllContext } from '../context/AllContext';
import { ImgPayment } from './ImgPayment';

export const ContainerQueryData = () => {

    const { allState } = useContext( AllContext );
    const { invoices } = allState;
    const [isCaptcha, setIsCaptcha] = useState(false);
    const [identifier, setIdentifier] = useState(null);
    const [total, setTotal] = useState(0);
    const [client, setClient] = useState({
        name: '',
        data: [],
    })

    useEffect(() => {
        if (invoices.length > 0) { 
            setIsCaptcha(true);
        }
    }, [invoices])

    useEffect(() => {
        setClient({
            name: '',
            data: [],
        })
    }, [])

    return (
        <div  className="container-style" >
            {
                ( isCaptcha ) 
                    ? (
                        <div
                            className='container-style-size'
                        >
                            <QueryData 
                                setClient={setClient}
                                uid={identifier}
                                total_temp={total}
                            />
                            <ImgPayment />
                            <List
                                className="container-query-data-list"
                                dataSource={ client.data }
                                renderItem={ (invoice, index) => (
                                    <List.Item >
                                        <ListData
                                            invoice={invoice}
                                            client={client}
                                            setClient={setClient}
                                            index={index}
                                        />
                                    </List.Item>
                                ) }
                            >
                            </List>
                        </div>
                    )
                    : (
                        <Home 
                            setIsCaptcha={setIsCaptcha}
                            identifier={identifier}
                            setIdentifier={setIdentifier}
                            setClient={setClient}
                            setTotal={setTotal}
                        />
                    )
            }
        </div>
    )
}
