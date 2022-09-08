import Input from "../../common/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./signup.css";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import { signupUser } from "../../services/signupService";
import { useState } from "react";
import { useAuth, useAuthActions } from "../../Providers/AuthProvider";
import useQuery from "../../hooks/useQuery";
import { useEffect } from "react";
const initialValues={
    name:"",
    email:"",
    phoneNumber:"",
    password:"",
    passwordConfirm:"",
};

const validationSchema = Yup.object({
    name: Yup.string()
      .required("name is required")
      .min(6, "invalid name format"),
    email: Yup.string()
      .email("invalid email format")
      .required("email is required"),
    phone: Yup.string()
      .required("phone is required")
      .matches(/^[0-9]{11}$/, "invalid phone number"),
    password: Yup.string().required("pass is required"),
    passwordConfirm: Yup.string()
      .required("pass confirmation is required")
      .oneOf([Yup.ref("password"), null], "password does not matches"),
      
  });


const SignupForm = () => {
  const navigate=useNavigate();//instaed history.push for redirecting

  const query=useQuery();
  const redirect=query.get("redirect") || "";

  const [error,setError]=useState(null);
  const setAuth=useAuthActions();
  const auth=useAuth();
  useEffect(()=>{
   if(auth) navigate(`/${redirect}`);
  },[auth,redirect]);//if auth has value(user has log in) push to redirect=checkout

  const onSubmit=async(values)=>{
  const userData={
    name:values.name,
    password:values.password,
    email:values.email,
    phoneNumber:values.phone
  }
    try {
    const {data}= await signupUser(userData);

    setAuth(data);
    //localStorage.setItem('authState',JSON.stringify(data));

    setError(null);
    navigate(`/${redirect}`);
    } catch (error) {
      console.log(error)
      if(error.response && error.response.data.message)
        setError(error.response.data.message);
      
    }

};

    const formik=useFormik({
        initialValues,
        onSubmit,
        validationSchema,
        validateOnMount : true,
        enableReinitialize :true,
    }
    );
    return (  
        <div className="formContainer">
            <form onSubmit={formik.handleSubmit}>
                <Input formik={formik} name="name" label="Name" />
                <Input formik={formik} name="email" label="Email" type="email" />
                <Input formik={formik} name="phone" label="phone" type="tel"/>
                <Input formik={formik} name="password" label="password" type="password"/>
                <Input formik={formik} name="passwordConfirm" label="passwordConfirm" type="password"/>
                <button type="submit" className="btn formButton ">SignUp</button>
                {error && <p style={{color : "red"}}>{error}</p>}
               <Link to= {`/login?redirect=${redirect}`}> <p style={{marginTop : "15px"}}>Already log in !</p></Link>
            </form>
        </div>
    );
}
 
export default SignupForm;