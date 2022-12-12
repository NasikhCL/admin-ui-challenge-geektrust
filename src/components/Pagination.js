import React from 'react'
import './pagination.css'
const Pagination = ({totalUsers, usersPerPage,currentPage, setCurrentPage}) => {
  console.log('pagination ')
  let pages=[];
  for(let i = 1; i<= Math.ceil(totalUsers/usersPerPage) ; i++){
      pages.push(i)
      // console.log(pages);
  }

// console.log('pages is equak to: '+pages);

  return (
    <div className='pagination'>
      <button disabled={currentPage<=1} onClick={()=> setCurrentPage(1)}><i class="fa-solid fa-angles-left"></i></button> 
        <button disabled={currentPage<=1} onClick={()=> setCurrentPage(current=> current-1)}><i class="fa-solid fa-angle-left"></i></button> 
       
        {pages.map((page, index)=>{
            return(

                    <button key={index} onClick={()=> setCurrentPage(page)} 
                    className={(page === currentPage) ? 'active' : ''}>{page}</button>
                
            )
        })}
        <button disabled={currentPage > pages.length-1} onClick={()=> setCurrentPage(current=> current+1)}><i class="fa-solid fa-angle-right"></i></button> 
        <button disabled={currentPage > pages.length-1} onClick={()=> setCurrentPage(pages.length)}><i class="fa-solid fa-angles-right"></i></button> 
        
    </div>
  )
}

export default Pagination


