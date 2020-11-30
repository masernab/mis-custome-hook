import { useEffect, useRef, useState } from "react"

export const useFetch = ( url ) => {

    const isMounted = useRef(true)
    
    useEffect(() => {
        return () => {
            isMounted.current = false;
        }
    }, [])
    const [state, setState] = useState({data:null, loading:true, error: null})
    useEffect(() => {
        setState({
            loading:true,
            error:null,
            data: null
        })
        fetch( url )
            .then(resp => resp.json())
            .then( data => {
                if(isMounted){
                    setState({
                        loading:false,
                        error:null,
                        data
                    })

                }
            })
            .catch((e) => {
                setState({
                    data: null,
                    loading:false,
                    error: 'No se pudo cargar la info'
                })
            })
    }, [url])
    return state;
}
