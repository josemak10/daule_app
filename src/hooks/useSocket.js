import { useCallback, useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';


export const useSocket = ( serverPath ) => {
    
    const [ socket, setSocket ] = useState(null);
    const [ online, setOnline ] = useState(false);
    const [ ip, setIp ] = useState("");

    const getData = async () => {
        const res = await axios.get("https://geolocation-db.com/json/");
        setIp(res.data.IPv4);
      };
    
      useEffect(() => {
        getData();
      }, []);
    
    const conectarSocket = useCallback( () => {

        const socketTemp = io.connect( serverPath, {
            transports: ['websocket'],
            autoConnect: true,
            forceNew: true,
            query: {
                // 'x-token': token
            }
        } );
        
        setSocket( socketTemp );
    }, [ serverPath ]);

    const desconecarSocket = useCallback( () => {

        socket.disconnect();

    }, [ socket ]);

    useEffect(() => {
        setOnline( socket?.connected );
    }, [socket])

    useEffect(() => {
        socket && socket.on('connect', () => setOnline( true ));
    }, [ socket ])

    useEffect(() => {
        socket && socket.on('disconnect', () => setOnline( false ));
    }, [ socket ])

    return {
        ip,
        socket,
        online,
        conectarSocket,
        desconecarSocket,
    }
}