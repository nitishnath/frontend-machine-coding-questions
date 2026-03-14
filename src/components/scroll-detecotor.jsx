import React from 'react'
import useScrollDetector from '../custom/useScrollDetector'

const ScrollDetector = () => {
    let elements = []

    const scrollDetector = useScrollDetector()
    console.log(scrollDetector, 'asdfg')

    for(let i = 0; i < 40; i++) {
        elements.push(i+1)
    }

  return (
    <main>
    <h2>ScrollDetector</h2>
    <h4>Scroll Direction: {scrollDetector}</h4>
    {elements.map(el => (
        <h3 key={el}>Custom Scrollbar Detection Hook<span>{el}</span></h3>
    ))}
    <h4>Scroll Direction: {scrollDetector}</h4>
    </main>
  )
}

export default ScrollDetector