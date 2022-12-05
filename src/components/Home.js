import React,{useState, useEffect} from "react";
import './home.css'
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import EditUser from "./EditUser";

export default function Home(){
    const [users, setUsers]= useState([]);
    const [isLoading,setIsLoading]= useState(true)
    const [editThisUser, setEditThisUser] = useState({})
    const [isEditing,setIsEditing] = useState(false)
    const [query , setQuery] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [usersPerPage, setUsersPerPage] = useState(10);
    console.log('render');
    
    useEffect(()=>{
        fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
        .then(res=> res.json())
        .then(data=> setUsers(data)) 
        setIsLoading(false)
        
    },[]) 

    const lastUserIndex = currentPage * usersPerPage;
    const firstUserIndex = lastUserIndex - usersPerPage;

    
    const currentPageUsers = users.slice(firstUserIndex, lastUserIndex)

    
    const handleForm = (e)=>{
        // console.log('render');
        setEditThisUser(prevData => {
            return({
                ...prevData,
                [e.target.name]: e.target.value
            })
        })

    }
 console.log(users)
 const handleSubmitEdit = ()=>{ 
    console.log('render');
    const newArr = users.map(user => (user.id === editThisUser.id) ? {...editThisUser} : user)
    setUsers([...newArr])
    setIsEditing(false)
 
}

 const editUser =(user)=>{
   
    setIsEditing(true)
    setEditThisUser(user)
    // let updatedUsers = users.filter(user => user.id !== id)
    // setUsers(updatedUsers)
 }

//  <span onClick={()=> editUser(user)}><img src="https://img.icons8.com/fluency/18/null/checkmark.png"/></span> tick
                    //    <span onClick={()=> deleteUser(user.id)}><img src="https://img.icons8.com/color/18/null/cancel--v1.png"/></span> cancel

 const deleteUser =(id)=>{
    console.log('render');
    let updatedUsers = users.filter(user => user.id !== id)
    setUsers(updatedUsers) 
 }

    const allUsers = currentPageUsers.filter((item) => item.name.toLowerCase().includes(query) || item.role.toLowerCase().includes(query) || item.email.toLowerCase().includes(query)).map(user => {
        return(
            
            (isEditing && user.id ===editThisUser.id) ?  
          <EditUser user={user} handleForm={handleForm} editThisUser={editThisUser} handleSubmitEdit={handleSubmitEdit} setIsEditing={setIsEditing}/> : 
        
                <tbody className="users-data" key={user.id}>
 

                   <td>{user.name}</td>
                   <td>{user.email}</td>
                   <td>{user.role}</td>  
                   <td>
                       <span onClick={()=> editUser(user)}><img src="https://img.icons8.com/external-anggara-flat-anggara-putra/18/null/external-edit-user-interface-anggara-flat-anggara-putra-5.png"/></span> 
                       <span onClick={()=> deleteUser(user.id)}><img src="https://img.icons8.com/color/18/null/delete-forever.png"/></span>
                    </td>
                </tbody>
            
            
          
        )
    })
    return(
        <div className="home">
            <SearchBar queue={query} setQuery={setQuery}/>
            <table className="users-table">
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                    </tr>
                </thead>
                { isLoading ? <h1>Loading ... </h1> : allUsers }
            </table>
          
            <Pagination totalUsers={users.length} usersPerPage={usersPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
        </div>


    )
}


