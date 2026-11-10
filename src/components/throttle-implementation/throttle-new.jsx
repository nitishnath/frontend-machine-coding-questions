import React from 'react'
import { useCountThrottle } from '../../custom/use-throttle'

const ThrottleNew = () => {

    const {
        throttleFn,
        count,
        remaining,
        reset
    } = useCountThrottle(5)

    const handleClick = () => {
        throttleFn(() => {
            console.log('API called succssfully')
        })
    }

  return (
   <div>
      <h2>Count-Based Throttling</h2>

      <p>Executions: {count}/5</p>
      <p>Remaining calls: {remaining}</p>

      <button
        onClick={handleClick}
        disabled={remaining === 0}
      >
        Call API
      </button>

      <button onClick={reset}>
        Reset
      </button>
    </div>
  )
}

export default ThrottleNew