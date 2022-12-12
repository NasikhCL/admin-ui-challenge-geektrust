import React from 'react'
import './edit-user.css'
const EditUser = ({user, handleForm,handleSubmitEdit ,editThisUser, setIsEditing})=> {
    console.log('render');
    return(
        <tr key={user.id}>
            <td>

            </td>
          <td>
            <input  name="name" type="text" onChange={(e)=>handleForm(e)} value={editThisUser.name} />
          </td>
          <td>
            <input name="email" type="email" onChange={handleForm} value={editThisUser.email} />
          </td>
          <td>
            <input name="role" type="text" onChange={handleForm} value={editThisUser.role} />
          </td>
          <td className='f-jcsa'>
            <span onClick={handleSubmitEdit}><img src="https://img.icons8.com/fluency/18/null/checkmark.png"/></span>
            <span onClick={()=> setIsEditing(false)}><img src="https://img.icons8.com/color/18/null/cancel--v1.png"/></span>
          </td>
        </tr>
    ) 
}

export default EditUser