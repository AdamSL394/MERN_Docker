import React from 'react'
import LogOut from '../components/logoutButton.js';
import './nav.css'
import { useNavigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react'

function Navbar() {

  const { user } = useAuth0();
  let navigate = useNavigate();

  function handleClick() {
    navigate("/");
  }
  const routeChanges = () => {
    let path = `/all`;
    navigate(path);
  }
  const upload = () => {
    let path = `/upload`;
    navigate(path);
  }
  const userSettings = () => {
    let path = `/userSettings`;
    navigate(path);
  }
  return (
    <div className='xl12 l12 m12 s12 xs12' id='navbar'>
      <span className="tabs" id="home" onClick={handleClick} > Home |</span>
      <span className="tabs" id="all" onClick={routeChanges} > View All Notes |</span>
      <span className="tabs" id="all" onClick={upload} > Upload Notes |</span>
      <i className="tabs" id="userName" onClick={userSettings}>  <i className='userInfo' style={{ fontFamily: "font-family:Times, Times New Roman, serif !important" }} >Hi <span role="img" aria-label="Star">👋🏼 &nbsp;</span> {user.name ? user.name : ""}</i> </i>
      <img id='userInfo' style={{ height: "25px", width: "25px" }} src={user.picture} referrerPolicy="no-referrer" alt="User Profile"></img>
      <LogOut></LogOut>
    </div>
  )
}


export default Navbar;