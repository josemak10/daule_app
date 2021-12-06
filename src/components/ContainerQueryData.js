import React, { useEffect, useState } from 'react';
import { List } from 'antd';
import { QueryData } from './QueryData';
import { ListData } from './ListData';
import { Home } from './Home';

export const ContainerQueryData = () => {

    const [isCaptcha, setIsCaptcha] = useState(false);
    const [client, setClient] = useState({
        name: '',
        data: [],
    })

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
