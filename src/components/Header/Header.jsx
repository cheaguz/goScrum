import React from 'react'
import './Header.styles.css'
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';


export const Header = () => {
const navigate = useNavigate();
const user = sessionStorage.getItem('user')


    const handleLogout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        navigate('/login',{replace: true})
    }

    const redirectToDonate = () => {
      navigate('/donate',{replace: true})
    }

  return (
    <header>
        <img src='img/goscrum.png' alt='logo' />
          <div className='wrapper'>
            <a onClick={redirectToDonate}> Donar</a>        
            <span>Hola {user}</span>
            <div onClick={handleLogout}>
              <Tooltip title='Cerrar sesion'>
                <LogoutIcon />
              </Tooltip>
            </div>
          </div>
        
    </header>
  )
}
