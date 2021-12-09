import React, { useContext, useEffect, useState } from 'react';
import { List } from 'antd';
import { QueryData } from './QueryData';
import { ListData } from './ListData';
import { Home } from './Home';
import { AllContext } from '../context/AllContext';

export const ContainerQueryData = () => {

    const { allState } = useContext( AllContext );
    const { invoices } = allState;
    const [isCaptcha, setIsCaptcha] = useState(false);
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
                        <>
                            <QueryData setClient={setClient} />
                            <List
                                className="container-query-data-list"
                                dataSource={ client.data }
                                renderItem={ invoice => (
                                    <List.Item >
                                        <ListData
                                            invoice={invoice}
                                            client={client}
                                            setClient={setClient}
                                        />
                                    </List.Item>
                                ) }
                            >
                            </List>
                        </>
                    )
                    : (
                        <Home setIsCaptcha={setIsCaptcha} />
                    )
            }
        </div>
    )
}
