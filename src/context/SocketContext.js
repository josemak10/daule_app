import React from 'react';
import { createContext } from 'react';

import { useSocket } from '../hooks/useSocket'


export const SocketContext = createContext();


export const SocketProvider = ({ children }) => {

    const { ip } = useSocket();

    
    return (
        <SocketContext.Provider value={{ ip }}>
            { children }
        </SocketContext.Provider>
    )
}
