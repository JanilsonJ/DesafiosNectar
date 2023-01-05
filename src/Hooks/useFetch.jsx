import { useEffect, useState } from "react";

import { API_TOKEN } from '@env'

const useFetch = (path, method = 'GET', body = null) => {
    const [data, setData] = useState(null);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState(null);

    const fetchOptions = {
        method: method,
        body: body ? JSON.stringify(body) : null,
        headers: new Headers({
            'Access-Token': API_TOKEN,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })
    }

    const requisitarAPI = async () => {
        setIsFetching(true);

        await fetch(path, fetchOptions)
        .then((response) => response.json())
        .then((data) => {
            setData(data);
        })
        .catch((err) => {
            console.log('Erro: ' + err)
            setData(null);
            setError(err);
        })
        .finally(() => {
            setIsFetching(false);
        });
    }

    return {data, error, isFetching, requisitarAPI}
}

export default useFetch;

