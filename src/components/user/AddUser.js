// import React, { useState } from "react";

// const AddUser = ({ handlingDataFromApp, submitHandle, datasFromApp }) => {
//   return (
//     <form onSubmit={submitHandle}>
//       <div className="container">
//         <div className="row">
//           <label className="col-2 form-label">Email address</label>
//           <div className="col input-group mb-3">
//             <input
//               type="text"
//               name="email"
//               className="form-control"
//               value={datasFromApp.email}
//               onChange={handlingDataFromApp}
//             />
//             <span className="input-group-text" id="basic-addon2">
//               @gmail.com
//             </span>
//           </div>
//         </div>
//         <div className="row mb-3">
//           <label className="col-2 form-label">Password</label>
//           <input
//             type="password"
//             name="password"
//             value={datasFromApp.password}
//             className="col form-control"
//             onChange={handlingDataFromApp}
//           />
//         </div>
//         <div className="row">
//           <label className=" col-2 form-label">Role</label>
//           <div className="col input-group mb-3">
//             <select
//               name="role"
//               value={datasFromApp.role}
//               className="form-select"
//               onChange={handlingDataFromApp}
//             >
//               <option value="none">Choose...</option>
//               <option value="admin">Admin</option>
//               <option value="employee">Employee</option>
//               <option value="hr">HR</option>
//             </select>
//             <label className="input-group-text">Options</label>
//           </div>
//         </div>

//         <div className="row">
//           <label className=" col-2 form-label">Gender</label>
//           <div className="col form-check">
//             <input
//               className="form-check-input"
//               type="radio"
//               name="gender"
//               id="flexRadioDefault1"
//               defaultChecked
//               value="male"
//               onChange={handlingDataFromApp}
//             />
//             <label className="col-2 form-check-label">Male</label>
//             <div className="col-2form-check">
//               <input
//                 className="form-check-input"
//                 type="radio"
//                 name="gender"
//                 id="flexRadioDefault2"
//                 value="female"
//                 onChange={handlingDataFromApp}
//               />
//               <label className="form-check-label mb-3">Female</label>
//             </div>
//           </div>

//           <div className="row mb-3">
//             <label className="col-2 form-label">First Name</label>
//             <input
//               type="text"
//               className="col form-control"
//               name="fName"
//               value={datasFromApp.fName}
//               onChange={handlingDataFromApp}
//             />
//           </div>
//           <div className="row mb-3">
//             <label className="col-2 form-label">Middle Name</label>
//             <input
//               type="text"
//               className="col form-control"
//               name="mName"
//               value={datasFromApp.mName}
//               onChange={handlingDataFromApp}
//             />
//           </div>
//           <div className="row mb-3">
//             <label className="col-2 form-label">Last Name</label>
//             <input
//               type="text"
//               className="col form-control"
//               name="lName"
//               value={datasFromApp.lName}
//               onChange={handlingDataFromApp}
//             />
//           </div>
//           <div className="row mb-3">
//             <label className="col-2 form-label">Contact Number</label>
//             <input
//               type="number"
//               className="col form-control"
//               name="contact"
//               value={datasFromApp.contact}
//               onChange={handlingDataFromApp}
//             />
//           </div>
//           <div className="row mb-3">
//             <label className="col-2 form-label">Department</label>
//             <input
//               type="text"
//               className="col form-control"
//               name="department"
//               value={datasFromApp.department}
//               onChange={handlingDataFromApp}
//             />
//           </div>
//           <div className="row mb-3">
//             <label className="col-2 form-label">Position</label>
//             <input
//               type="text"
//               className="col form-control"
//               name="position"
//               onChange={handlingDataFromApp}
//               value={datasFromApp.position}
//             />
//           </div>
//         </div>

//         {/* <div className="mb-3 form-check">
//         <input type="checkbox" className="form-check-input" id="exampleCheck1" />
//         <label className="form-check-label" for="exampleCheck1">
//           Check me out
//         </label>
//       </div> */}
//         <div>
//           <button type="submit" className="btn btn-primary">
//             Submit
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default AddUser;

/////////////////////////////////////////////////////////
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames";

const AddUser = ({ handlingDataFromApp, submitHandle, datasFromApp }) => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onTouched",
    defaultValues:{
      email:"",
      password:"",
      role:"",
      gender:"",
      fName:"",
      mName:"",
      lName:"",
      contact:"",
      department:"",
      position:""
    }
  });
  console.log(errors);
  return (
    <form onSubmit={handleSubmit(submitHandle)}>
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
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Please enter a valid email",
                },
              })}
            />

            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-2 form-label">Password</label>
          <input
            type="password"
            name="password"
            className={classNames("col form-control", {
              "is-invalid": errors.password,
            })}
            {...register("password", {
              required: "Password is required",
              pattern: {
                value:
                  /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
                message:
                  "Password must be at least 8 characters long, must contain at least 1 uppercase letters, 1 special characters ",
              },
            })}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password.message}</div>
          )}
        </div>
        <div className="row">
          <label className=" col-2 form-label">Role</label>
          <div className="col input-group mb-3">
            <select
              name="role"
              className={classNames("col form-select", {
                "is-invalid": errors.role,
              })}
              {...register("role", {
                required: "Role is required",
              })}
            >
              <option value="">Choose...</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
              <option value="hr">HR</option>
            </select>
            {errors.role && (
              <div className="invalid-feedback">{errors.role.message}</div>
            )}

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
              value="male"
              {...register("gender")}
            />
            <label className="col-2 form-check-label">Male</label>
            <div className="col-2form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="flexRadioDefault2"
                value="female"
              {...register("gender")}

                // onChange={handlingDataFromApp}
              />
              <label className="form-check-label mb-3">Female</label>
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-2 form-label">First Name</label>
            <input
              type="text"
              className={classNames("col form-control", {
                "is-invalid": errors.fName,
              })}
              name="fName"
              {...register("fName", {
                required: "Firstname is required",
                minLength: {
                  value: 4,
                  message: "Firstname should be minimum 4 characters",
                },
              })}
            />
            {errors.fName && (
              <div className="invalid-feedback">{errors.fName.message}</div>
            )}
          </div>
          <div className="row mb-3">
            <label className="col-2 form-label">Middle Name</label>
            <input type="text" className="col form-control" name="mName"
            {...register("mName")} />
          </div>
          <div className="row mb-3">
            <label className="col-2 form-label">Last Name</label>
            <input
              type="text"
              className={classNames("col form-control", {
                "is-invalid": errors.lName,
              })}
              name="lName"
              {...register("lName", { required: true, minLength: 4 })}
            />

            {errors.lName?.type === "required" && (
              <div className="invalid-feedback">Lastname is required</div>
            )}
            {errors.lName?.type === "minLength" && (
              <div className="invalid-feedback">
                Lastname should be minimum 4 characters
              </div>
            )}
          </div>
          <div className="row mb-3">
            <label className="col-2 form-label">Contact Number</label>
            <input
              type="number"
              className={classNames("col form-control", {
                "is-invalid": errors.contact,
              })}
              name="contact"
              {...register("contact", {
                required: "Contact Number is required",
                pattern: {
                  value: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                  message: "Enter a valid contact number",
                },
              })}
            />
            {errors.contact && (
              <div className="invalid-feedback">{errors.fName.message}</div>
            )}
          </div>
          <div className="row mb-3">
            <label className="col-2 form-label">Department</label>
            <input type="text" className="col form-control" name="department" {...register("department")} />
          </div>
          <div className="row mb-3">
            <label className="col-2 form-label">Position</label>
            <input type="text" className="col form-control" name="position" {...register("position")} />
          </div>
        </div>

        {/* <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
        <label className="form-check-label" for="exampleCheck1">
          Check me out
        </label>
      </div> */}
        <div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button onClick={()=>{reset()}} type="button" className="btn btn-secondary">Reset Field</button>
        </div>
      </div>
    </form>
  );
};

export default AddUser;
