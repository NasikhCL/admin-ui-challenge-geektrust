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
    // const [isChecked, setIsChecked] = useState(false)
    const [filteredUser, setFilteredUsers] = useState([])
    const [selectAll, setSelectAll]= useState({1: false, 2: false, 3: false, 4: false, 5:false})
    console.log('render');
    const handleSelectAll = ()=>{
        // setIsChecked(prev => !prev)
    // console.log(user)
        // setUsers(prev => prev.slice(firstUserIndex, lastUserIndex))

    }
    
    useEffect(()=>{
        fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
        .then(res=> res.json())
        .then(data=> setUsers(data))
        setIsLoading(false)
        
    },[]) 

    const lastUserIndex = currentPage * usersPerPage;
    const firstUserIndex = lastUserIndex - usersPerPage;

    
    let currentPageUsers = filteredUser.slice(firstUserIndex, lastUserIndex);

    // useEffect(()=>{
    //     console.log(currentPageUsers)
    // },) 
    useEffect(()=>{
        let newArray = users.filter((item) => item.name.toLowerCase().includes(query) || item.role.toLowerCase().includes(query) || item.email.toLowerCase().includes(query)).map(user => ({...user, isChecked: false}))
        setFilteredUsers(newArray)
        console.log(filteredUser);
        console.log('current page user :' + currentPageUsers.length)
        // if(currentPageUsers.length === 1){
            // }
            
        },[query, users])

    useEffect(()=>{       
            setCurrentPage(1)
         },[query])
    
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
    if(currentPageUsers.length === 1){
        setCurrentPage(currentPage - 1)
    }
    setUsers(updatedUsers) 
 }

 const handleCheckChange = (userC) =>{
    // console.log(check);
    // const checkedUser = {...user, isChecked: !user.isChecked}
    const newArr = filteredUser.map(user => (user.id === userC.id ?{...user, isChecked: !user.isChecked} : user ))
    setFilteredUsers(newArr)
 }
 const handleCheckedAll = ()=>{
    console.log(currentPageUsers)
    // onst lastUserIndex = currentPage * usersPerPage;
    // const firstUserIndex = lastUserIndex - usersPerPage;
    // const newArr = filteredUser.map(user => user.id === currentPageUsers ({...user , isChecked: !user.isChecked }))
    currentPageUsers = currentPageUsers.map(user => ({...user , isChecked: !user.isChecked}))
    setFilteredUsers(prevData => {
        let count = 0;
        let newData =[];
        for (let i =0; i< prevData.length; i++){

            if(count<lastUserIndex && count >= firstUserIndex){
                newData.push({...prevData[i],isChecked: !prevData[0].isChecked})
                count++;
            }else{
                newData.push(prevData[i])
                count++;
            }
        }
        return newData;
    });
    // const filtArr = filteredUser.map(user=> (currentPageUsers.filter(cUser => cUser.id !== user.id )) )
    // const fullArr
    // setFilteredUsers([...newArr, ...filteredUser])
    // currentPageUsers(newArr)
    console.log(currentPageUsers)
    // setFilteredUsers( filtArr.concat(newArr) )
   
 }
 const handleDeleteSelected =()=>{

    const newArr = filteredUser.filter(user => !user.isChecked)
    setUsers(newArr)
     // const allUsers =  
    }



    return(
        <div className="home">
            <SearchBar queue={query} setQuery={setQuery}/>
            { users.length === 0  ? <h1>No Users Found</h1> :
                <table className="users-table"> 
                    <thead>
                        <tr>
                            <th>#<input type="checkbox"  onChange={handleCheckedAll} /></th>
                            <th>Name</th> 
                            <th>Email</th> 
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { isLoading ? <tr><td>Loading...</td></tr> : currentPageUsers.map(user => {
                                            return(
                                                
                                                (isEditing && user.id ===editThisUser.id) ?  
                                            <EditUser user={user} handleForm={handleForm} editThisUser={editThisUser} handleSubmitEdit={handleSubmitEdit} setIsEditing={setIsEditing}/> : 
                                            
                                                    <tr key={user.id}>
                                    
                                                    <td><input checked={user.isChecked} onChange={()=>handleCheckChange(user) } type="checkbox" /></td>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.role}</td>  
                                                    <td>
                                                        <span onClick={()=> editUser(user)}><img src="https://img.icons8.com/external-anggara-flat-anggara-putra/18/null/external-edit-user-interface-anggara-flat-anggara-putra-5.png"/></span> 
                                                        <span onClick={()=> deleteUser(user.id)}><img src="https://img.icons8.com/color/18/null/delete-forever.png"/></span>
                                                        </td>
                                                    </tr>
                                                
                                                
                                            
                                            )
    }) }
                        
                    </tbody> 
                </table> 
        }
            <button className="delete-button" onClick={handleDeleteSelected}>Delete All</button>
          
            <Pagination totalUsers={filteredUser.length} usersPerPage={usersPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} currentPageUsers={currentPageUsers} />
        </div>


    )
}


 