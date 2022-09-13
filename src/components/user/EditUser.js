import axios from "axios";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditUser = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  // alert(id)

  const goBack = () => {
    navigate("/viewUser");
  };

  const {
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const [singleUsr, setSingleUsr] = useState({
    email:'',
    password:'',
    role:'',
    gender:'',
    fName:'',
    mName:'',
    lName:'',
    contact:'',
    department:'',
    position:''
  });

  useEffect(()=>{
    axios
          .get(`http://localhost:3001/users/${id}`)
          .then((res) => {
            // console.log("Data Going to be fetched");
            console.log("Response", res.data);
            setSingleUsr(res.data);
          })
          .catch((err) => {
            console.log("Error", err);
          });

  }, [id])

  const handlingData = (event) => {
        // console.log(event.target.value);
        const name = event.target.name;
        const value = event.target.value;
    
        setSingleUsr({ ...singleUsr, [name]: value });
      };

      const updateUser = (e)=>{
        e.preventDefault();
        axios.put(`http://localhost:3001/users/${id}`, singleUsr);
        toast.success("User Edited Successfully!",{position:toast.POSITION.TOP_RIGHT});
        navigate("/viewUser",0);

      }
  
  return (
    <form onSubmit={updateUser} >
      <div className="container">
        <div className="row">
          <label className="col-2 form-label">Email address</label>
          <div className="col input-group mb-3">
            <input
              type="text"
              name="email"
              className={classNames("form-control", {
                "is-invalid": errors.email,
              })}
              value={singleUsr.email}
              onChange={handlingData}

              // {...register("email", {
              //   required: "Email is required",
              //   pattern: {
              //     value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              //     message: "Please enter a valid email",
              //   },
              // })}
            />

            {/* {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )} */}
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-2 form-label">Password</label>
          <input
            type="password"
            name="password"
            value={singleUsr.password}
              onChange={handlingData}
              className="col form-control"
            // className={classNames("col form-control", {
            //   "is-invalid": errors.password,
            // })}
            // {...register("password", {
            //   required: "Password is required",
            //   pattern: {
            //     value:
            //       /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
            //     message:
            //       "Password must be at least 8 characters long, must contain at least 1 uppercase letters, 1 special characters ",
            //   },
            // })}
          />
          {/* {errors.password && (
            <div className="invalid-feedback">{errors.password.message}</div>
          )} */}
        </div>
        <div className="row">
          <label className=" col-2 form-label">Role</label>
          <div className="col input-group mb-3">
            <select
              name="role"
              value={singleUsr.role}
              onChange={handlingData}
              // className={classNames("col form-select", {
              //   "is-invalid": errors.role,
              // })}
              // {...register("role", {
              //   required: "Role is required",
              // })}
            >
              <option value="">Choose...</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
              <option value="hr">HR</option>
            </select>
            {/* {errors.role && (
              <div className="invalid-feedback">{errors.role.message}</div>
            )} */}

            <label className="input-group-text">Options</label>
          </div>
        </div>

        <div className="row">
          <label className=" col-2 form-label">Gender</label>
          <div className="col form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="flexRadioDefault1"
              defaultChecked
              onChange={handlingData}
              value="male"
              // {...register("gender")}
            />
            <label className="col-2 form-check-label">Male</label>
            <div className="col-2form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="flexRadioDefault2"
                value="female"
              onChange={handlingData}
                // {...register("gender")}

                // onChange={handlingDataFromApp}
              />
              <label className="form-check-label mb-3">Female</label>
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-2 form-label">First Name</label>
            <input
              type="text"
              className="col form-control"
              // className={classNames("col form-control", {
              //   "is-invalid": errors.fName,
              // })}
              name="fName"
              value={singleUsr.fName}
              onChange={handlingData}
              // {...register("fName", {
              //   required: "Firstname is required",
              //   minLength: {
              //     value: 4,
              //     message: "Firstname should be minimum 4 characters",
              //   },
              // })}
            />
            {/* {errors.fName && (
              <div className="invalid-feedback">{errors.fName.message}</div>
            )} */}
          </div>
          <div className="row mb-3">
            <label className="col-2 form-label">Middle Name</label>
            <input
              type="text"
              className="col form-control"
              name="mName"
              value={singleUsr.mName}
              onChange={handlingData}
              // {...register("mName")}
            />
          </div>
          <div className="row mb-3">
            <label className="col-2 form-label">Last Name</label>
            <input
              type="text"
              className="col form-control"
              // className={classNames("col form-control", {
              //   "is-invalid": errors.lName,
              // })}
              name="lName"
              value={singleUsr.lName}
              onChange={handlingData}
              // {...register("lName", { required: true, minLength: 4 })}
            />

            {/* {errors.lName?.type === "required" && (
              <div className="invalid-feedback">Lastname is required</div>
            )}
            {errors.lName?.type === "minLength" && (
              <div className="invalid-feedback">
                Lastname should be minimum 4 characters
              </div>
            )} */}
          </div>
          <div className="row mb-3">
            <label className="col-2 form-label">Contact Number</label>
            <input
              type="number"
              className="col form-control"
              // className={classNames("col form-control", {
              //   "is-invalid": errors.contact,
              // })}
              name="contact"
              value={singleUsr.contact}
              onChange={handlingData}
              // {...register("contact", {
              //   required: "Contact Number is required",
              //   pattern: {
              //     value: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
              //     message: "Enter a valid contact number",
              //   },
              // })}
            />
            {/* {errors.contact && (
              <div className="invalid-feedback">{errors.fName.message}</div>
            )} */}
          </div>
          <div className="row mb-3">
            <label className="col-2 form-label">Department</label>
            <input
              type="text"
              className="col form-control"
              name="department"
              value={singleUsr.department}
              onChange={handlingData}
              // {...register("department")}
            />
          </div>
          <div className="row mb-3">
            <label className="col-2 form-label">Position</label>
            <input
              type="text"
              className="col form-control"
              name="position"
              value={singleUsr.position}
              onChange={handlingData}
              // {...register("position")}
            />
          </div>
        </div>

        {/* <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
        <label className="form-check-label" for="exampleCheck1">
          Check me out
        </label>
      </div> */}
        <div>
          <button className="btn btn-secondary" onClick={() => goBack()}>
            Go Back
          </button>

          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditUser;
