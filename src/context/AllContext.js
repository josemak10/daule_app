import React, { useReducer } from 'react';
import { createContext } from 'react';
import { allReducer } from './allReducer';


export const AllContext = createContext();

const initialState = {
    ids: [],
    invoices: [],
}


export const AllProvider = ({ children }) => {

    const [allState, dispatch] = useReducer( allReducer, initialState );
   
    return (
        <AllContext.Provider value={{ 
            allState,
            dispatch
         }}>
            { children }
        </AllContext.Provider>
    )
}