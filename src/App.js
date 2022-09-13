import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useParams,
} from "react-router-dom";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import Navbar from "./components/navbar/Navbar";
import AddUser from "./components/user/AddUser";
import EditUser from "./components/user/EditUser";
import ViewUser from "./components/user/ViewUser";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

// toast.configure();

function App() {
  // const {id} = useParams();
  const { register, errors, handleSubmit } = useForm();
  const [users, setUsers] = useState([]);

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

  // const [datas, setDatas] = useState({
  //   date:new Date().getTime().toString(),
  //   email: "",
  //   password: "",
  //   role: "",
  //   gender: "",
  //   fName: "",
  //   mName: "",
  //   lName: "",
  //   contact: "",
  //   department: "",
  //   position: "",
  // });

  const notify = () => {
    toast.success("User Added Successfully!",{position:toast.POSITION.TOP_RIGHT});
  };

  const onSubmit = (data) => {
    console.log("Data", data);
    const newUser = { ...data };
    console.log("NewUser",newUser);
    axios.post("http://localhost:3001/users", newUser).then((res) => {
      console.log("Response After Post", res.data);
      setUsers([...users, res.data]);
    });
    notify();
    // reset();

  };

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <Dashboard />
            </>
          }
        />
        <Route
          exact
          path="/addUser"
          element={
            <>
              <Navbar />
              <AddUser
                // datasFromApp={datas}
                // useForm={register}
                submitHandle={onSubmit}
                // handlingDataFromApp={handlingData}
              />
              <ToastContainer/>
            </>
          }
        />
        <Route
          exact
          path="/viewUser"
          element={
            <>
              <Navbar />
              <ViewUser />
              <ToastContainer/>

            </>
          }
        />
        <Route
          exact
          path="/editUser/:id"
          element={
            <>
              <Navbar />
              <EditUser />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
