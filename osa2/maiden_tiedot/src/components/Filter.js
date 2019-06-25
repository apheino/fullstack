import React from 'react'

const Filter = ({listFilter, handleListFilterChange}) => {
    return (
        <div>
            find countries <input value={listFilter} onChange={handleListFilterChange}/>
        </div> 
   ) 
}
 
export default Filter
    