import React, {useRef, useState } from 'react';

const InfiniteScrollPractice = () => {
    const [count, setCount] = useState(50);
    const [loading, setLoading] = useState(false);
   const refData = useRef(null)

    const elements = [];
    for (let i = 0; i < count; i++) {
        elements.push(i+1)
    }

    const onScroll = (e) => {
        const { scrollHeight, scrollTop, clientHeight } = e.target
        
        if(scrollTop + clientHeight >= scrollHeight - 100 && !loading) {
            setLoading(true)
            setTimeout(() => {
                setCount(prevState => prevState + 50)
                setLoading(false)
            }, 500)
        }
    }

    return (
        <main
        refData={refData}
            style={{ height: '93vh', overflow: 'auto', padding: '20px' }}
            onScroll={onScroll}
        >
            <div>Infinite scroll practice</div>
            {elements.map(item => (
                <div key={item}>{item}</div>
            ))}
            {loading && <span>Loading More...</span>}
        </main>
    )
}

export default InfiniteScrollPractice