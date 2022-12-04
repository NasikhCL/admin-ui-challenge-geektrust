import React,{useState, useEffect} from "react";
import './home.css'



export default function Home(){
    const [users, setUsers]= useState([]);
    const [isLoading,setIsLoading]= useState(true)
    const [editThisUser, setEditThisUser] = useState({})
    const [isEditing,setIsEditing] = useState(false)
    useEffect(()=>{
        fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
        .then(res=> res.json())
        .then(data=> setUsers(data))
        setIsLoading(false)
        
    },[]) 
    
    const handleForm = (e)=>{
        
        setEditThisUser(prevData => {
            return({
                ...prevData,
                [e.target.name]: e.target.value
            })
        })

    }
 console.log(users)
 const handleSubmitEdit = ()=>{
    const nweArr = users.map(user => (user.id === editThisUser.id) ? {...editThisUser} : user)
    setUsers([...nweArr])
    setIsEditing(false)
 
}
 const ToEditUser = (user)=> {
    return(
        <div  key={user.id}>
            <input  name="name" type="text" onChange={(e)=>handleForm(e)} value={editThisUser.name} />
            <input name="email" type="email" onChange={handleForm} value={editThisUser.email} />
            <input name="role" type="text" onChange={handleForm} value={editThisUser.role} />
            <span onClick={handleSubmitEdit}><img src="https://img.icons8.com/fluency/18/null/checkmark.png"/></span>
            <span onClick={()=> setIsEditing(false)}><img src="https://img.icons8.com/color/18/null/cancel--v1.png"/></span>
        </div>
    ) 
}
 const editUser =(user)=>{
    console.log(user); 
    setIsEditing(true)
    setEditThisUser(user)
    // let updatedUsers = users.filter(user => user.id !== id)
    // setUsers(updatedUsers)
 }

//  <span onClick={()=> editUser(user)}><img src="https://img.icons8.com/fluency/18/null/checkmark.png"/></span> tick
                    //    <span onClick={()=> deleteUser(user.id)}><img src="https://img.icons8.com/color/18/null/cancel--v1.png"/></span> cancel

 const deleteUser =(id)=>{
    let updatedUsers = users.filter(user => user.id !== id)
    setUsers(updatedUsers) 
 }

    const allUsers = users.map(user => {
        return(
            
            (isEditing && user.id ===editThisUser.id) ?  
          <ToEditUser /> : 
        
                <tbody key={user.id}>
 

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
            home
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
        </div>


    )
}


