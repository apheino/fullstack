import React from 'react'

const Filter = ({listFilter, handleListFilterChange}) => {
    return (
        <div>
            filter shown with: <input value={listFilter} onChange={handleListFilterChange}/>
        </div> 
   )
} 

export default Filter
    