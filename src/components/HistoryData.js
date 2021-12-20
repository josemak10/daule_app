import React from 'react';
import { List } from 'antd';
import { TableHistory } from './TableHistory';


export const HistoryData = ({ data }) => {
    return (
        <List
            className="container-query-data-list"
            dataSource={ data }
            renderItem={ row => (
                <List.Item >
                    <TableHistory row={row} />
                </List.Item>
            ) }
        >
        </List>
    )
}
