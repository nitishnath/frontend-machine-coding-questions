import React, { useState } from 'react'

const StaleClosure = () => {

    const [post, setPost] = useState(0);

    const handleClick = async () => {
        setTimeout(() => {
            setPost(post + 1)
        }, 2000);
    }

  return (
    <div>
        <h1>No of Post: {post}</h1>
        <button onClick={handleClick}>Click Stale Closure</button>
    </div>
  )
}

export default StaleClosure