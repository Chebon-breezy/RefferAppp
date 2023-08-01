import React, {useState, useEffect} from 'react';
import "./Styles/Home.css";
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from "../Firebase";
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [user, setuser] = useState("Default@gmail.com");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
      setuser(currentUser.email);
    });
    return ()=>{
      unsubscribe();
    }
  }, []);

  const signOutHandler = async (e)=>{
    e.preventDefault();
    signOut(auth);
    navigate('/');
  }

  return (
    <div className='home'>
      <h1 className='hhead'>HOME PAGE</h1>
      <div className="hbox">
      <h1>Hello and Welcome</h1>
        { user && <p className='huser'> { user }</p> }
        <button className='btn hbtn' onClick={signOutHandler}>LogOut</button>
      </div>
    </div>
  )
}
