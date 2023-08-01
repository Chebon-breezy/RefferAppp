import {useState, useEffect} from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';

function App() {
  const [msg, setmsg] = useState(" ");
  const [showalert, setshowalert] = useState();

  const alertfun = (a, b)=>{
      setmsg(a);
      setshowalert(b);
  };

  useEffect(() => {
      const al = document.querySelector('.alert');
      if(al){
        al.style.display = 'block';
        setTimeout(() => {
          al.style.display = 'none';
        }, 3000);
      }
  }, [showalert]);
  

  return (
    <div className="app">
      <BrowserRouter>
      { showalert && <div className="alert">{msg} </div> }
          <Routes>
            <Route path='/' element={<Signup alertfun={alertfun}/>} />
            <Route path='/login' element={<Login alertfun={alertfun}/>} />
            <Route path='/home' element={<Home/>} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
