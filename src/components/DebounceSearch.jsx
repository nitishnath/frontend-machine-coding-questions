import { useState } from 'react'
import { useDebounce } from '../custom/use-debouce'

const DebounceSearch = () => {

    const [searchData, setSearchData] = useState('')

    const handleSearch = (value) => {
        //console.log(value, 'value')
        setSearchData(value)
    }

    const handleDebounce = useDebounce(handleSearch, 1000)

  return (
    // <>
    //     <input placeholder='Seach here...' type='search' onChange={(e) => handleDebounce(e.target.value)}/>
    //     <div>Debounce search result is: {searchData}</div>
    // </>
    <div>
      <input
        placeholder="Search Somthing"
        type="search"
        style={{ width: "200px", height: "30px", borderRadius: "10px" }}
        onChange={(e) => handleDebounce(e.target.value)}
      />
      <div style={{ marginTop: "10px", wordBreak: "break-all" }}>
        Seached values is: {searchData}
      </div>
    </div>
  )
}

export default DebounceSearch