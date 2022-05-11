import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url) => {
    const [loading, setLoading] = useState(true)
    const [result, setResult] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                const response = axios.get(url)
                setTimeout(() => {
                    setResult(response.data)
                    setLoading(false)
                }, 5000);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [url]);
    
    return { loading, result }
}

export default useFetch;