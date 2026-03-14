import React, { useEffect, useRef, useState } from 'react'

const useScrollDetector = () => {

    const [scrollData, setScrollData] = useState('')
    const prevScrollY = useRef(null)

    const handleScroll = () => {
        prevScrollY.current > window.scrollY ? setScrollData('up') : setScrollData('down')
        prevScrollY.current = window.scrollY
        // console.log(window.scrollY, 'hello');
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    },[])

    return scrollData
}

export default useScrollDetector