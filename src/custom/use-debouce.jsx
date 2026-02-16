import {useCallback, useRef, useEffect} from 'react';

export const useDebounce = (callBack, delay) => {
    const timerRef = useRef(null);

    const debouncedFn = useCallback((...args) => {
        if(timerRef.current) clearTimeout(timerRef.current)

        timerRef.current = setTimeout(() => {
            callBack(...args)
        },delay)
    }, [callBack, delay])

    // cleanup when component unmounts
    useEffect(() => {
        return () => {
            if(timerRef.current) clearTimeout(timerRef.current)
        }
    },[])

    return debouncedFn;
}