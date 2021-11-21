import React, { useEffect, useState } from 'react';
import { ListData } from '../components/ListData';
import { QueryData } from '../components/QueryData';

import { ContainerLogo } from '../components/ContainerLogo';

export const Invoice = () => {

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
        <div className="container-principal">
            <ContainerLogo />
            <QueryData
                setClient={setClient}
            />
            <ListData
                client={client}
                setClient={setClient}
            />
        </div>
    )
}
