import React from "react";
import "./edit-user.css";
const EditUser = ({
  user,
  handleInput,
  handleSubmitEdit,
  editThisUser,
  setIsEditing,
  handleCheckChange,
}) => {
  console.log("render");
  return (
    <tr className={user.isChecked ? "selected" : ""} key={user.id}>
      <td>
        <input
          checked={user.isChecked}
          onChange={() => handleCheckChange(user)}
          type="checkbox"
        />
      </td>
      <td>
        <input
          name="name"
          type="text"
          onChange={(e) => handleInput(e)}
          value={editThisUser.name}
        />
      </td>
      <td>
        <input
          name="email"
          type="email"
          onChange={handleInput}
          value={editThisUser.email}
        />
      </td>
      <td>
        <input
          name="role"
          type="text"
          onChange={handleInput}
          value={editThisUser.role}
        />
      </td>
      <td className="flex-jcsa">
        <span onClick={handleSubmitEdit}>
          <i class="apply-edit fa-solid fa-check"></i>
        </span>
        <span onClick={() => setIsEditing(false)}>
          <i class="cancel-edit fa-solid fa-xmark"></i>
        </span>
      </td>
    </tr>
  );
};

export default EditUser;
