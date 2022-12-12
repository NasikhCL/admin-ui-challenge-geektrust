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
          <td className='flex-jcsa'>
            <span onClick={handleSubmitEdit}><i class="apply-edit fa-solid fa-check"></i></span>
            <span onClick={()=> setIsEditing(false)}><i class="cancel-edit 
            ]fa-solid fa-xmark"></i></span>
          </td>
        </tr>
    ) 
}

export default EditUser