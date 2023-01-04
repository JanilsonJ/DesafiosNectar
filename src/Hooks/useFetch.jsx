import { useEffect, useState } from "react";

const useFetch = (path, options = null) => {
    const [data, setData] = useState(null);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState(null);

    const fetchOptions = {
        method: 'GET',
        headers: new Headers({
            'Access-Token': `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjMxODQzNTYsImV4cCI6MTY5NDcyMDIxNywidXNlckxvZ2luIjoiMUBuZWN0YXIuY29tIiwidXNlcklkIjoiMjY2IiwidXN1YXJpb01hc3RlcklkIjoiMjY1In0.VgTsTd2SRAXCazn0oyaAkgp4-YPSMcIBgbuw3WGwgAM`,
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

