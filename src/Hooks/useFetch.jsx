import { useEffect, useState } from "react";

import { API_TOKEN } from '@env'

const useFetch = (path, options = null) => {
    const [data, setData] = useState(null);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState(null);

    const fetchOptions = {
        method: 'GET',
        headers: new Headers({
            'Access-Token': API_TOKEN,
        })
    }

    useEffect(() => {
        fetch(path, fetchOptions)
        .then((response) => response.json())
        .then((data) => {
            setData(data);
        })
        .catch((err) => {
            setData(null);
            setError(err);
        })
        .finally(() => {
            setIsFetching(false);
        });
    }, [])

    return {data, error, isFetching}
}

export default useFetch;

