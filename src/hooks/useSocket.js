import { useEffect, useState } from 'react';
import axios from 'axios';


export const useSocket = () => {
    
    const [ ip, setIp ] = useState("");

    const getData = async () => {
        const res = await axios.get("https://geolocation-db.com/json/");
        setIp(res.data.IPv4);
      };
    
      useEffect(() => {
        getData();
      }, []);


    return {
        ip,
    }
}