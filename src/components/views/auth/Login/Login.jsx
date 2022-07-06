import React from 'react'
import '../Auth.styles.css'
import { useFormik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import { swal } from '../../../../utils/swal';
import { login } from '../../../../api/userServices'



export const Login = () => {
const navigate = useNavigate()
const initialValues = {userName : '',password : ''}

const validate = (values) => {
    const errors = {}
    if(!values.userName) {
        errors.userName = 'El userName es requerido'
    }
    if(!values.password) {
        errors.password = 'El password es requerido'
    }
    return errors
}

const onSubmit = () => {
    /* sessionStorage.setItem('logged','yes') */
      login(values)
      .then(response => response.json())
      .then(data => {
        if(data.status_code === 200){
          sessionStorage.setItem('token',data.result.token)
          sessionStorage.setItem('user' , data.result.user.userName)
          navigate("/", { replace: true }) 
        }else{
          swal() 
        }
        
      })
      .catch(err => console.log(err))
}
const formik = useFormik({initialValues, validate, onSubmit})
const { values } = formik;

    



  return (
    <div className="auth">
    <form onSubmit={formik.handleSubmit}>
      <h1>Iniciar sesion</h1>
      <div>
        <label>user</label>
        <input name='userName' type='text' onChange={formik.handleChange} value={formik.values.userName}/>
        {formik.errors.userName && <div>{formik.errors.userName}</div>}
      </div>
      <div>
        <label>Password</label>
        <input name='password' type='password' onChange={formik.handleChange} value={formik.values.password}/>
        {formik.errors.password && <div>{formik.errors.password}</div>}
      </div>
      <div>
        <button type='submit'>Enviar</button>
      </div>
      <div>
        <Link to='/register'>Registro</Link>
      </div>
    </form>
  </div>
  )
}
