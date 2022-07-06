import React from 'react'
import './Error.styles.css'
import { Link } from 'react-router-dom'


const Error404 = () => {
  return (
    <div className='container'>
      <div className='frame'>
         Pagina no encontrada
         <div>
            <Link to='/'> Home </Link> 
          </div>  
      </div>

    </div>
  )
}

export default Error404
