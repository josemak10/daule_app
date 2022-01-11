import React from 'react';
import { Tag } from 'antd';


export const TableHistory = ({ row }) => {

    return (
        <div
            className="row w-100"
        >
            <div
                className="col-10"
            >
                <div
                    className="row justify-content-around w-100"    
                >
                    <Tag
                        color="magenta"
                        className="col-auto col-lg-auto table-data-text"
                    >
                        {row.state}
                    </Tag>
                    <label
                        className="col-auto col-lg-auto table-data-text-reference"
                    > 
                        Referencia:  {row.reference}
                    </label>
                </div>

                <label
                    className="col-12 table-data-text table-data-text-oblique"
                > 
                    {row.identifier + ' - ' + row.name} 
                </label>
                <label
                    className="col-12 table-data-text-detalle"
                >
                    {row.date + ' - ' + row.description + ', ' + row.message}
                </label>
            </div>

            <div
                className="col-2 align-self-center container-query-data-total-text"
            >
                <label
                    className="container-list-data-block2-total"
                >
                    $ {row.amount}
                </label>
            </div>
        </div>
    )
}
