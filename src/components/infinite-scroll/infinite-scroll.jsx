import React, { useRef, useState } from 'react'

const InfiniteScroll = () => {
    const [count, setCount] = useState(50)
    const[loading, setLoading] = useState(false);
    const mainRef = useRef(null)
    let elements = [];
    for (let i = 0; i < count; i++) {
        elements.push(i + 1)
    }

    const handleScroll = (e) => {
        const {scrollTop, scrollHeight, clientHeight} = e.target

        if(scrollTop + clientHeight >= scrollHeight - 100 && !loading) {
            setLoading(true)
            setTimeout(() => {
                setCount(prev => prev + 50);
                setLoading(false)
            }, 500)
        }
    }

    return (
        <main onScroll={handleScroll}
        ref={mainRef}
         style={{ 
                height: '93vh', 
                overflow: 'auto',
                padding: '20px'
            }}>
            <div>InfiniteScroll</div>
            {elements.map((item) => (
                <div key={item}>{item}</div>
            ))}
            {loading && <div>Loading more...</div>}
        </main>
    )
}

export default InfiniteScroll