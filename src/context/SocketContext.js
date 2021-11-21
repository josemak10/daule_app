import React, { useEffect } from 'react';
import { createContext } from 'react';

import { useSocket } from '../hooks/useSocket'


export const SocketContext = createContext();


export const SocketProvider = ({ children }) => {

    const { ip, socket, online, conectarSocket } = useSocket('http://localhost:8090');


    useEffect(() => {

        conectarSocket();
        
    }, [ conectarSocket ])

    // useEffect(() => {
    
    //     desconecarSocket();
        
    // }, [ desconecarSocket ])

    
    return (
        <SocketContext.Provider value={{ socket, online, ip }}>
            { children }
        </SocketContext.Provider>
    )
}
