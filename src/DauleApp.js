import React from 'react'
import { AllProvider } from './context/AllContext'
import { SocketProvider } from './context/SocketContext'
import { RouterPage } from './router/RouterPage'

export const DauleApp = () => {
    return (
        <AllProvider>
            <SocketProvider>
                <RouterPage />
            </SocketProvider>
        </AllProvider>
    )
}
