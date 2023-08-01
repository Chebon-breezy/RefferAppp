import React, {useState} from 'react'
import "./Styles/Signup.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from "../Firebase";
import GoogleButton from 'react-google-button';

export default function Signup(props) {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  // const [error, seterror] = useState("");

  const signupSubmit = async (e)=>{
    e.preventDefault();
    props.alertfun("", false);
    createUserWithEmailAndPassword(auth, email, password)
    .then((res=>{ navigate('/login');
    }))
    .catch(err=>{
      // seterror(err.message);
      props.alertfun(err.message, true);
    })
  }

  const googleSignIn = (e)=>{
    e.preventDefault();
    props.alertfun("", false);
    const googleAuthProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleAuthProvider)
    .then(res=>{
      navigate('/home');
    })
    .catch(err=>{
      // seterror(err.message);
      props.alertfun(err.message, true);
    })
  }

  return (
    <div className='signup'>
        <h1 className='head'>Signup</h1>
        {/* {error && <p>{error}</p>} */}
        <form className='form' onSubmit={signupSubmit}>
          <input className='mail' type="email" placeholder='Email' onChange={(e)=>{ setemail(e.target.value); }}/> <br />
          <input className='pass' type="password" placeholder='Password' onChange={(e)=>{ setpassword(e.target.value); }}/> <br />
          <button className='btn'>SIGN UP</button>
        </form>
        <GoogleButton className='gbtn' onClick={googleSignIn}/>
        <p>Already have an account ?  <NavLink to='/login' >Login</NavLink></p>
    </div>
  )
}
