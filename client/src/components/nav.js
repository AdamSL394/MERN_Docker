import React, { Component } from 'react'
import LogOut from '../components/logoutButton';
import './nav.css'

class Navbar extends Component {
    constructor() {
        super()
        this.state = {
            bg: "black",
            email: "black",
            machine: "black"
        }
    }
    changeTextColor = () => {
        this.setState({
            bg: "purple"
        })
    }
    homepageReload = () => {
        window.location.href = "/"
    }


    render() {
        return (
            <div className='xl12 l12 m12 s12 xs12' id='navbar'>
                <LogOut></LogOut>
                {/* <img className="header" onClick={this.homepageReload} src={"./CertifiedAtmsLogo.png"} alt="Certified Atms Logo"/> */}
                <span className="tabs" id="home" onClick={() => console.log("clicked")} > Home |</span>
                <span className="tabs" id="email" onClick={() => console.log("clicked")}>Email Us |</span>
                <span className="tabs" id="aboutUs" onClick={() => console.log("clicked")}> About Us </span>
            </div>
        )
    }
}



export default Navbar;