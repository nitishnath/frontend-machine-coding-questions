import { useCallback, useRef, useState } from "react"

export const useCountThrottle = (limit = 5) => {
    const counterRef = useRef(0);
    const [count, setCount] = useState(0);

    const throttleFn = useCallback((fn) => {
        
        if(counterRef.current >= limit) {
            console.log('Execution limit reached');
            return;
        }

        counterRef.current += 1;
        setCount(counterRef.current);

        fn();
    },[limit])

    const reset = useCallback(() => {
        counterRef.current = 0;
        setCount(0);
    },[])

    return {
        throttleFn,
        reset,
        count,
        remaining: Math.max(0, limit - count)
    }
}