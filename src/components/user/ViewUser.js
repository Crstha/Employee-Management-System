import React, { useEffect, useState } from "react";
import "./ViewUser.css";
import { faTrash, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link  } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ViewUser = () => {
  // console.log("FROM APP", users);
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState([]);
  const [filteredUser, setFilteredUser] = useState([]);


  // const navigate = useNavigate();

  // const goToEditSection = (id)=>{
  //   navigate("/editUser")
  //   console.log("IDDD",id);
  //   localStorage.setItem("ID",id)
  // }

  const reload = ()=>{
    window.location.reload(false);
  }
  useEffect(() => {
    axios
      .get(`http://localhost:3001/users`)
      .then((res) => {
        // console.log("Data Going to be fetched");
        console.log("Response", res.data);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);

  const handleDelete = async id => {
    await axios.delete(`http://localhost:3001/users/${id}`)
    var newdata = users.filter((item) => {
        return item.id !== id;
    })
    setUsers(newdata);
    toast.success("User Deleted Successfully!",{position:toast.POSITION.TOP_RIGHT});

}

const findUser = (event)=>{
  setSearchUser(event.target.value);
  let filterUser = users.filter((user)=>user.fName.toLowerCase().includes(searchUser))
  setFilteredUser(filterUser);
  console.log(filteredUser);
}

  return (
    <div className=" text-center">
      <button className="btn btn-info" onClick={reload}>Reload In Any Case</button>
      <div className="row"> 
      <h3 className="text col-2">Search User </h3>
      <input type='text' value={searchUser}  onChange={findUser} className="form-control col" style={{width:"20px"}}/>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">First Name</th>
            <th scope="col">Middle Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Role</th>
            <th scope="col">Contact</th>
            <th scope="col">Department</th>
            <th scope="col">Position</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
         {
          users.filter((usr)=>{
            if(searchUser==""){
              return usr
            }else if(usr.fName.toLowerCase().includes(searchUser.toLowerCase())){
              return usr
            }
          })
          .map((usr) => {
            return (
              <tr key={usr.id}>
                <th scope="row">{usr.id}</th>
                <td>{usr.email}</td>
                <td>{usr.password}</td>
                <td>{usr.fName}</td>
                <td>{usr.mName}</td>
                <td>{usr.lName}</td>
                <td>{usr.role}</td>
                <td>{usr.contact}</td>
                <td>{usr.department}</td>
                <td>{usr.position}</td>
                <td>
                  <Link to={`/editUser/${usr.id}`}>
                  <FontAwesomeIcon icon={faUserPen} />
                  </Link>
                  <FontAwesomeIcon onClick={() => handleDelete(usr.id)} icon={faTrash} />

                </td>
                
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ViewUser;
