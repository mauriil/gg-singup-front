import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { loginSchema } from "./utils/schema";
import "./style.css";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { loginUser } from "../../services/users/index.ts";

function Login(props) {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, setValue } = useForm({
    resolver: joiResolver(loginSchema),
  });

  const submit = async (formValues) => {
    try {
      console.log("llamada con datos: ", formValues);
      setLoading(true);
      const loginResponse = await loginUser(formValues);
      console.log("🚀 ~ file: index.js ~ line 23 ~ submit ~ loginResponse", loginResponse)
      if (loginResponse.statusCode === 200)  {
        alert("login success")
        alert(JSON.stringify(loginResponse.data))  
      } else {
        alert(loginResponse.data)
      }
      
      setLoading(false);
    } catch (e) {
      alert("falla login, chequear datos");
      failed(e);
    }
  };

  const failed = (e) => {
    console.log(e);
    if (e.email || e.password) {
      console.log("falla login, faltan datos");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit, failed)} id="main">

        <div className="input-parent">
          <label htmlFor="email" className="loginText">
            Email
          </label>
          <input type="text" id="email" {...register("email")} />
        </div>

        <div className="input-parent">
          <label htmlFor="password" className="loginText">
            Password
          </label>
          <input type="password" id="password" {...register("password")} />
        </div>
        
        {loading ? (
          <button className="gridContainer" disabled><TailSpin height="30" color="grey" ariaLabel="loading" /></button>
        ) : (
          <button type="submit">Login</button>
        )}

        <div>
          <label className="loginText">
            Don't have an account? <Link to='/register'> Sign up </Link>
          </label>
        </div>
      </form>
    </>
  );
}

export default Login;
