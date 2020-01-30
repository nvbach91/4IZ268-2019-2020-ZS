import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import * as firebase from "firebase/app";
import { Button, Nav } from 'react-bootstrap';
//import './App.css';
import NotePage from './NotePage.js';
import Firebase from './Firebase.js';

function App() {

  const [userEmail, setUserEmail] = useState('');
  const [userGooId, setUserGooId] = useState('');

  //Response after authentification
  const responseGoogle = response => {
    localStorage.setItem('GNUAID', response.profileObj.googleId);
    localStorage.setItem('GNUAEM', response.profileObj.email);
    setUserGooId(localStorage.getItem('GNUAID'));
  };

//Response for failure situations
  const badResponse = () => {
    alert('Bad response from Google. Page is going to be refreshed. Try to login one more, please.');
    window.location.replace('http://localhost:3000/');
  };

  //Update state for cases when page was refreshed (consistensy)
  useEffect(() => {
    if (localStorage.getItem('GNUAEM')) {
      setUserEmail(localStorage.getItem('GNUAEM'));
    };
  }, []);

  //Conditional render (mainframe(z\OS lol))
  if (localStorage.getItem('GNUAID')) {
    return (<div><NotePage /></div>);
  } else {
    return (<div className="App">

    <Nav className="justify-content-center" activeKey="/home">
     <Nav.Item>
       <Nav.Link><GoogleLogin clientId="619156863396-09hfggs2svjiqktioij8t3cpfq3s29m9.apps.googleusercontent.com" buttonText="Login" onSuccess={responseGoogle} onFailure={badResponse} cookiePolicy={'single_host_origin'}/></Nav.Link>
     </Nav.Item>
   </Nav>


    </div>);
  }

}

export default App;
