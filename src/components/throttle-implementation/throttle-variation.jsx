import { useCallback } from 'react'

const ThrottleVariation = () => {

    const handleThrottle = (value) => {
        console.log(value, 'value')
    }

    // Count Based Throttle
    const countBasedThrottle = (func, skipCount) => {
        let callCount = 0;        

        return function(...args) {
            callCount++;
            
            if(callCount % (skipCount + 1) === 0){
                 func.apply(this, args)
            }
        }
    }

    const throttleFun = useCallback(() => {
        return countBasedThrottle(handleThrottle, 4)
    }, [])


  return (
    <div>
       <button onClick={(e) => {
    const throttledFn = throttleFun();
    throttledFn(e.target.value);
}}>Click Me</button>
    </div>
  )
}

export default ThrottleVariation