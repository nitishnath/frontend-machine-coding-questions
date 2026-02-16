import React, { useMemo, useState } from 'react';


const ChildrenComp = React.memo(({ user }) => {
    console.log('child renderd');
    return (
        <div>{user.name}</div>
    )
}) 

const ReactMemoUseCase = () => {
    const [count, setCount] = useState(0);

    // user reference changes on every render i.e new object is created on every render when setCount is updated, which cause ChildrenComp to re-render
    // to avoid this we use useMemo
    // const user = {
    //     name: 'Nitish'
    // }

     //user reference stays the same because of useMemo.That's why ChildrenComp does not re-render when setCount is updated
    const user = useMemo(()=> ({
        name: 'Nitish'
    }),[])
    
    return (
        <div>
            <button onClick={() => {
                setCount(count + 1)
            }}>Increase Count = {count}</button>
            <ChildrenComp user={user} />
        </div>
    )
}

export default ReactMemoUseCase