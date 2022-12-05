import React from 'react'
import './search-bar.css'
const SearchBar = ({query, setQuery})=>{
        
  return(
          <input className="search-bar" type="text" placeholder="Search User By name, role or email" value={query} onChange={(e)=> setQuery(e.target.value)}/>
  )
}

export default SearchBar