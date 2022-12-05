import React from 'react'

const EditUser = ({user, handleForm,handleSubmitEdit ,editThisUser, setIsEditing})=> {
    console.log('render');
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

export default EditUser