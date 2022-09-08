import Input from "../../common/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./login.css";
import {Link, useNavigate} from "react-router-dom";
import { useState,useEffect } from "react";
import { loginUser } from "../../services/loginService";
import { useAuth, useAuthActions } from "../../Providers/AuthProvider";
import useQuery from "../../hooks/useQuery";
const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("invalid email format")
    .required("email is required"),

  password: Yup.string().required("pass is required"),
});

const Login = () => {
 const [error,setError]=useState(null);
 const query=useQuery();
 const redirect=query.get("redirect") || "";

 const navigate=useNavigate();
 const setState=useAuthActions();
 
 const auth=useAuth();
 useEffect(()=>{
  if(auth) navigate(`/${redirect}`);
 },[auth,redirect]);

  const onSubmit =async (values) => {
    
      try {
      const {data}= await loginUser(values);
      console.log("data",data)
      setState(data);
      
      //localStorage.setItem('authState',JSON.stringify(data));
    
      navigate(`/${redirect}`); //navigate to query
      setError(null);
      } catch (error) {
        console.log(error)
        if(error.response && error.response.data.message)
          setError(error.response.data.message);
        
      }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });
  return (
    <div className="formContainer">
      <form onSubmit={formik.handleSubmit}>
        <Input formik={formik} name="email" label="Email" type="email" />
        <Input
          formik={formik}
          name="password"
          label="password"
          type="password"
        />
        <button type="submit" className="btn formButton ">
          LogIn
        </button>
        {error && <p style={{color : "red"}}>{error}</p>}
        <Link to= {`/signup?redirect=${redirect}`}> <p style={{marginTop : "15px"}}>Not sign up yet !</p></Link>
      </form>
    </div>
  );
};

export default Login;
