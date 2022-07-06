import React from 'react'
import './Donate.styles.css'
const DONATION = import.meta.env.VITE_DONATION;
import { useNavigate } from 'react-router-dom'

export const Donate = () => {
  const navigate = useNavigate();

  const redirectToHome = () => {
    setTimeout(()=>{
      navigate('/',{replace: true})
    }, 1000)
  }
  return (
    <main className='container'>
        <section>
            <h1>Colabora con el proyecto</h1>
            <a href={DONATION} target='_blank' rel='noreferrer' onClick={redirectToHome}>Donar</a>
        </section>
    </main>
  )
}
