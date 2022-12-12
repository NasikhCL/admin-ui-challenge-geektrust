import React, { useState, useEffect } from "react";
import "./home.css";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import EditUser from "./EditUser";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editThisUser, setEditThisUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
//   const [usersPerPage, setUsersPerPage] = useState(10);
  // const [isChecked, setIsChecked] = useState(false)
  const [filteredUser, setFilteredUsers] = useState([]);
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const usersPerPage = 10;
  console.log("render");

  useEffect(() => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((res) => res.json())
      .then((data) => setUsers(data));
    setIsLoading(false);
  }, []);

  const lastUserIndex = currentPage * usersPerPage;
  const firstUserIndex = lastUserIndex - usersPerPage;

  let currentPageUsers = filteredUser.slice(firstUserIndex, lastUserIndex);

  // useEffect(()=>{
  //     console.log(currentPageUsers)
  // },)
  useEffect(() => {
    let newArray = users
      .filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.role.toLowerCase().includes(query) ||
          item.email.toLowerCase().includes(query)
      )
      .map((user) => ({ ...user, isChecked: false }));
    setFilteredUsers(newArray);
    // console.log(filteredUser);
    // console.log("current page user :" + currentPageUsers.length);
    // if(currentPageUsers.length === 1){
    // }
  }, [query, users]);

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);
  
  const handleForm = (e) => {
    // console.log('render');
    setEditThisUser((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };
  console.log(users);
  const handleSubmitEdit = () => {
    console.log("render");
    const newArr = users.map((user) =>
      user.id === editThisUser.id ? { ...editThisUser } : user
    );
    setUsers([...newArr]);
    setIsEditing(false);
  };

  const editUser = (user) => {
    setIsEditing(true);
    setEditThisUser(user);
    // let updatedUsers = users.filter(user => user.id !== id)
    // setUsers(updatedUsers)
  };

 
  const deleteUser = (id) => {
    console.log("render");
    let updatedUsers = users.filter((user) => user.id !== id);
    if (currentPageUsers.length === 1) {
      setCurrentPage(currentPage - 1);
    }
    setUsers(updatedUsers);
  };

  const handleCheckChange = (userC) => {
    // console.log(check);
    // const checkedUser = {...user, isChecked: !user.isChecked}
    
    const newArr = filteredUser.map((user) =>
      user.id === userC.id ? { ...user, isChecked: !user.isChecked } : user
    );
    setFilteredUsers(newArr);
  };
  const handleCheckedAll = () => {
    console.log(currentPageUsers);
    setIsCheckedAll(!isCheckedAll)
    // onst lastUserIndex = currentPage * usersPerPage;
    // const firstUserIndex = lastUserIndex - usersPerPage;
    // const newArr = filteredUser.map(user => user.id === currentPageUsers ({...user , isChecked: !user.isChecked }))
    // currentPageUsers = currentPageUsers.map(user => ({...user , isChecked: !user.isChecked}))
    if(isCheckedAll){
        
        setFilteredUsers((prevData) => {
          let count = 0;
          let newData = [];
          for (let i = 0; i < prevData.length; i++) {
            if (count < lastUserIndex && count >= firstUserIndex) {
              newData.push({ ...prevData[i], isChecked: false });
              count++;
            } else {
              newData.push(prevData[i]);
              count++;
            }
          }
          return newData;
        });
       
    }else{
       
        setFilteredUsers((prevData) => {
          let count = 0;
          let newData = [];
          for (let i = 0; i < prevData.length; i++) {
            if (count < lastUserIndex && count >= firstUserIndex) {
              newData.push({ ...prevData[i], isChecked: true });
              count++;
            } else {
              newData.push(prevData[i]);
              count++;
            }
          }
          return newData;
        });
       
    }

    
    // const filtArr = filteredUser.map(user=> (currentPageUsers.filter(cUser => cUser.id !== user.id )) )
    // const fullArr
    // setFilteredUsers([...newArr, ...filteredUser])
    // currentPageUsers(newArr)
    console.log(currentPageUsers);
    // setFilteredUsers( filtArr.concat(newArr) )
  };
  const handleDeleteSelected = () => {
    alert("Selected Users Will be deleted");
    const newArr = filteredUser.filter((user) => !user.isChecked);
    setUsers(newArr);
    // const allUsers =
  };

  return (
    <div className="home">
      <SearchBar queue={query} setQuery={setQuery} />
      {(users.length === 0) ? <h1 className="m-auto">No Users Found</h1>
       : (
        <table className="users-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={isCheckedAll}
                  onChange={handleCheckedAll}
                />
                #
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
       
          <tbody>
            {isLoading ? (
              <tr>
                <td>Loading...</td>
              </tr>
            ) : (
              currentPageUsers.map((user) => {
                return isEditing && user.id === editThisUser.id ? (
                  <EditUser
                    user={user}
                    handleForm={handleForm}
                    editThisUser={editThisUser}
                    handleSubmitEdit={handleSubmitEdit}
                    setIsEditing={setIsEditing}
                  />
                ) : (
                  <tr className={user.isChecked ? 'selected' : ''} key={user.id}>
                    <td>
                      <input
                        checked={user.isChecked}
                        onChange={() => handleCheckChange(user)}
                        type="checkbox"
                      />
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td className="flex-jcsa">
                      <span onClick={() => editUser(user)}>
                      <i className="edit-user fa-regular fa-pen-to-square"></i>
                      </span>
                      <span onClick={() => deleteUser(user.id)}>
                      <i className="delete-user fa-solid fa-trash-can"></i>
                      </span>
                    </td>
                  </tr>
            
                
                );
              })
            )}
          </tbody>
        </table>
      )}
      <button className="delete-selected-btn" onClick={handleDeleteSelected}>
        Delete Selected
      </button>

      <Pagination
        totalUsers={filteredUser.length}
        usersPerPage={usersPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        currentPageUsers={currentPageUsers}
      />
    </div>
  );
}
