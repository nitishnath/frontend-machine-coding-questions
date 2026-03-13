// In React write a component that displays a button. When that button is pressed it displays the first item in an array. 
// Each further button press will display the next array element as well as all the previous elements. 
// Once the array is fully displayed,the next button press will clear the displayed array and will only 
// show the first element again and the process.
// repeats itself (showing a new array element with each button press.

import React, { useState } from 'react'

const ProgressiveArrayDisplay = () => {
    const items = ['apple', 'banana', 'Mango', 'Guava', 'Watermelon']
    const[ visibleCount, setVisibleCount] = useState(0) 

    const handleDispItems = () => {
        if(visibleCount >= items.length) {
            setVisibleCount(1)
        } else {
            setVisibleCount(count => count + 1)
        }
    }    

    return (
        <>
            <div style={{ margin: '10px 0px' }}>Progressive Array Display</div>
            <button style={{ marginTop: '10px' }} onClick = {handleDispItems}>Display List</button>
            <ul>
                {items.slice(0, visibleCount).map((el, index) => 
                <li key={index}>{el}</li>)}
            </ul>
        </>
    )
}

export default ProgressiveArrayDisplay