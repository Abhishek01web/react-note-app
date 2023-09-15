import React from 'react';
import logo from '../assets/images/logo.png';
// import { FaSquareGithub } from 'react-icons/fa';
import { BsGithub } from 'react-icons/bs';

const Header = () => {
  return (
    <>
     <div className='header'>
        <div className='header_left'>
            <img className='logo' src={logo} alt={logo} />
        </div>
        <div className='header_right'>
           <button className='btn' ><a href="https://github.com/Abhishek01web/react-note-app" target='_blank' rel="noreferrer"><BsGithub /></a></button>
        </div>
     </div>
    </>
  )
}

export default Header;
