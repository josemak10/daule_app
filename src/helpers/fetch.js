const baseUrl = process.env.REACT_APP_API_URL;
const token = process.env.REACT_APP_KEY_ACCESTOKEN;

export const fetchSinTocken = async( endpoint, data, method = 'GET') => {

    const url = `${baseUrl}/${endpoint}`;
    if (method==='GET'){
        const resp = await fetch(url);
        return await resp.json();
    } else {
        const resp = await fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json', 
            },
            body: JSON.stringify(data)
        })
        return await resp.json();
    }
}


export const fetchConTocken = async( endpoint, data, method = 'GET') => {

    const url = `${baseUrl}/${endpoint}`;

    if (method==='GET'){
        const resp = await fetch(url, {
            headers: {
                'Accesstoken': token
            }
        });
        return await resp.json();
    } else {
        const resp = await fetch(url, {
            method,
            mode: 'no-cors',
            headers: {
                'Content-type': 'application/json',
                'Accesstoken': token
            },
            body: JSON.stringify(data)
        })

        return await resp.json();
    }
}