import React from 'react';
import { List } from 'antd';
import { QueryData } from './QueryData';
import { ListData } from './ListData';

export const ContainerQueryData = ({ client, setClient }) => {
    return (
        <div  className="container-style container-query" >
            <QueryData setClient={setClient} />
            <List
                className="container-query-data-list"
                dataSource={ client.data }
                renderItem={ invoice => (
                    <List.Item>
                        <ListData
                            invoice={invoice}
                            client={client}
                            setClient={setClient}
                        />
                    </List.Item>
                ) }
            >
            </List>
        </div>
    )
}
