import React from 'react'
import './pagination.css'
const Pagination = ({totalUsers, usersPerPage,currentPage, setCurrentPage}) => {
    let pages=[];
    for(let i = 1; i<= Math.ceil(totalUsers/usersPerPage) ; i++){
        pages.push(i)
    }
  return (
    <div className='pagination'>
        <button disabled={currentPage<=1} onClick={()=> setCurrentPage(current=> current-1)}>Prev</button> 
       
        {pages.map((page, index)=>{
            return(

                    <button key={index} onClick={()=> setCurrentPage(page)} 
                    className={(page === currentPage) ? 'active' : ''}>{page}</button>
                
            )
        })}
        <button disabled={currentPage > pages.length-1} onClick={()=> setCurrentPage(current=> current+1)}>Next</button> 
        
    </div>
  )
}

export default Pagination


