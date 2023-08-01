import React, {useState} from 'react';
import "./Styles/Login.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../Firebase";


export default function Login(props) {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  // const [error, seterror] = useState("");

  const loginSubmit = async (e)=>{
    e.preventDefault();
    props.alertfun("", false);
    signInWithEmailAndPassword(auth, email, password)
    .then((res=>{
      navigate('/home');
    }))
    .catch(err=>{
      // seterror(err.message);
      props.alertfun(err.message, true);
    })
  }

  return (
    <div className='login'>
        <h1 className='head'>Login</h1>
        <form className='form lform' onSubmit={loginSubmit}>
          <input className='mail' type="email" placeholder='Email' onChange={(e)=>{ setemail(e.target.value); }}/> <br />
          <input className='pass' type="password" placeholder='Password' onChange={(e)=>{ setpassword(e.target.value); }}/> <br />
          <button className='btn lbtn'>LOG IN</button>
        </form>
        <p>Don't have an account ?  <NavLink to='/' >Signup</NavLink></p>
    </div>
  )
}
