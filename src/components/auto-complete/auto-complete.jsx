import React, { useEffect, useState, useRef } from 'react'
import './auto-complete.css'

const AutoComplete = () => {
    
    const [query, setQuery] = useState('')
    const[recipeList, setRecipeList] = useState([])
    const timerRef = useRef()
    const[focus, setFocus] = useState(false)

    //Local Caching data so that for same query api should not get called result will display from cached data.
    // const [cachedData, setCachedData] = useState({})
    const cacheRef = useRef({})

    const handleSeach  = (e) => {
        const value = e.target.value;
        setQuery(value)
    }

    const fetchData = async(query) => {

        // if(cachedData[query]) {
        //     setRecipeList(cachedData[query])
        //     return;
        // }

        if(cacheRef.current[query]) {
            setRecipeList(cacheRef.current[query])
            return
        }

        if(!query.trim()) return
        try{
            const response = await fetch(`https://dummyjson.com/recipes/search?q=${query}`);
            const data = await response.json()            
            setRecipeList(data.recipes)
            // setCachedData(prevState => ({
            //     ...prevState,
            //     [query]: data.recipes 
            // }))
            cacheRef.current = {
                ...cacheRef.current,
                [query]: data?.recipes
            }
        } catch(error) {
            console.error('Error fetching recipes: ', error)
            return []
        }
    }

    useEffect(() => {
        if(query.length === 0 && recipeList.length > 0) {
            setRecipeList([])
        }

        //debounce search
        timerRef.current = setTimeout(() => {
            fetchData(query)
        }, 500)

        return (() => {
            if(timerRef.current) clearTimeout(timerRef.current)
        })

    },[query])  
    
  return (
    <main className='main-container'>
        <div>AutoComplete Search Bar</div>
        <input ref={timerRef} type="search" placeholder='Search here...' onChange={handleSeach} value={query} className='input-field' onFocus={() => {setFocus(prev => !prev)}} onBlur={() => setFocus(prev => !prev)} />
        {focus && <div className='list-data'>
            {recipeList.length > 0 ? (
                    recipeList.map(el => (
                        <div key = {el.id} style={{ padding: '8px', borderBottom: '1px solid #010024' }}>{el.name}</div>
                    ))
                ) : <div>You haven't search anything!</div>
            }
        </div>}
    </main>
  )
}

export default AutoComplete