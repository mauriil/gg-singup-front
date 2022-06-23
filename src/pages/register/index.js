import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { registerSchema } from "./utils/schema";
import "./style.css";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { createUser } from "../../services/users/index.ts";

function Register(props) {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, setValue } = useForm({
    resolver: joiResolver(registerSchema),
  });

  const submit = async (formValues) => {
    try {
      console.log("llamada con datos: ", formValues);
      setLoading(true);
      const user = await createUser(formValues);
      props.loginFunction(true);
      setSaved(true);
      setLoading(false);
      localStorage.setItem('userToken', user.data.token);
    } catch (e) {
      failed(e);
    }
  };

  const failed = (e) => {
    console.log(e);
    if (e.name || e.password || e.email) {
      alert("falla registro, chequear datos");
      console.log("falla login, chequear datos");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit, failed)} id="main">

      <div className="input-parent">
          <label htmlFor="name" className="loginText">
            Username
          </label>
          <input type="text" id="name" {...register("name")} />
        </div>

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
          <button type="submit">Create Account</button>
        )}

        <div>
          <label className="loginText">
            Already have an account? <Link to='/login'> Sign in </Link>
          </label>
        </div>
      </form>
    </>
  );
}

export default Register;
