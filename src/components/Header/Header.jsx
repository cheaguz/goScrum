import React , {useEffect , useState} from 'react'
import './Header.styles.css'
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import { tasksMe } from '../../api/taskServices'

export const Header = () => {
  const [data ,setData] = useState();
const navigate = useNavigate();
const user = sessionStorage.getItem('user')
const createdTasks = data?.length;

//pasar a redux
useEffect( ()=> {
  tasksMe()
  .then(res => setData(res.result) )
  .catch(err => console.log(err))
},[])

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
            <button><a onClick={redirectToDonate}> Donar</a> </button>      
            <span>Tareas creadas : {createdTasks}</span>  
            <span>{user}</span>
            <div onClick={handleLogout}>
              <Tooltip title='Cerrar sesion'>
                <LogoutIcon />
              </Tooltip>
            </div>
          </div>
        
    </header>
  )
}
