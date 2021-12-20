import React from 'react';
import { Tag } from 'antd';


export const TableHistory = ({ row }) => {

    return (
        <div
            className="container-list-data"
        >
            <div
                className="container-list-data-block1"
            >
                <div className="container-table-data-firt-row">
                    <Tag
                        color="magenta"
                        className="table-data-text"
                    >
                        {row.state}
                    </Tag>
                    <label
                        className="table-data-text"
                    > 
                        Referencia:  {row.reference}
                    </label>
                </div>

                <label
                    className="table-data-text table-data-text-oblique"
                > 
                    {row.identifier + ' - ' + row.name} 
                </label>
                <label
                    className="table-data-text-detalle"
                >
                    {row.date + ' - ' + row.description + ', ' + row.message}
                </label>
            </div>

            <div
                className="container-list-data-block2"
            >
                <label
                    className="container-list-data-block2-total"
                >$ {row.amount}</label>
            </div>
        </div>
    )
}
