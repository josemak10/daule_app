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
        const xhr = new XMLHttpRequest();
        xhr.open(
            method,
            url,
            false
        )
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.setRequestHeader("Accesstoken", token);
        xhr.send( data );
        if ( xhr.status === 200 ) { 
            return JSON.parse( xhr.response );
        } else {
            return null;
        }
    }
}