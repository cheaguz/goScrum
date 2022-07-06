import React, { useState, useEffect } from 'react'
import '../Auth.styles.css';
import { useFormik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { Switch, FormControlLabel } from '@mui/material';
const API_HOST = import.meta.env.VITE_API_HOST;
import { register } from '../../../../api/userServices';
import { getFormData } from '../../../../api/taskServices';

export const Register = () => {
  const [data, setData] = useState();

  useEffect(() => {
    getFormData()
      .then(data => setData(data.result))
      .catch(err => console.lor(err))
  }, []);

  const navigate = useNavigate();

  const initialValues = {
    userName: '',
    password: '',
    email: '',
    teamID: '',
    rol: '',
    continent: '',
    region: '',
    switch: false
  };

  const validation = '* El campo es requerido'
  const validationSchema = Yup.object().shape({
    userName: Yup.string().required(validation),
    password: Yup.string().required(validation),
    email: Yup.string().required(validation),
    /*  teamID: Yup.string().required(validation), */
    rol: Yup.string().required(validation),
    continent: Yup.string().required(validation),
    region: Yup.string().required(validation),
  })

  const onSubmit = () => {
    const teamID = values.teamID == '' ? uuidv4() : values.teamID
    const user= {
      userName: values.userName,
      password: values.password,
      email: values.email,
      teamID: teamID,
      role: values.rol,
      continent: values.continent,
      region: values.region,
    }

      register(user)
      .then(data => navigate("/registered/" + data?.result?.user?.teamID, { replace: true }))
      .catch(err => console.log(err))

  }

  const formik = useFormik({ initialValues, validationSchema, onSubmit })
  const { handleSubmit, handleBlur, handleChange, errors, values, setFieldValue } = formik

  const handleChangeContinent = (value) => {
    setFieldValue('continent', value)
    if (value !== 'America') setFieldValue('region', 'Otro')
  }
  return (
    <div className='auth'>
      <form onSubmit={handleSubmit}>
        <div>
          <label>username</label>
          <input type='text' name='userName' onChange={handleChange} onBlur={handleBlur} />
          {errors.userName && <span>{errors.userName}</span>}
        </div>
        <div>
          <label>Mail</label>
          <input type='email' name='email' onChange={handleChange} onBlur={handleBlur} />
          {errors.email && <span>{errors.email}</span>}
        </div>
        <div>
          <label>Contraseña</label>
          <input type='password' name='password' onChange={handleChange} onBlur={handleBlur} />
          {errors.password && <span>{errors.password}</span>}
        </div>
        <FormControlLabel
          control={
            <Switch
              value={values.switch}
              onChange={() => formik.setFieldValue("switch", !formik.values.switch)}
              name='switch'
              color='secondary'
            />
          }
          label='Perteneces a un equipo ya creado'
        />
        {!values.switch && <div>
          <label> Por favor, introduce el identificador de equipo</label>
          <input
            type='text'
            name='teamID'
            value={values.teamID}
            onChange={handleChange}
          />
        </div>}


        <div>
          <div>
            <label>Rol</label>
            <br />
            <select onChange={handleChange} onBlur={handleBlur} name='rol'>
              <option value=''>Ingresa un rol</option>
              {data?.Rol.map((r, i) => <option key={i} value={r}> {r} </option>)}
            </select>
            {errors.role && <span>{errors.role}</span>}
          </div>
          <div>
            <label>Continente </label>
            <br />

            <select onChange={e => handleChangeContinent(e.target.value)} onBlur={handleBlur} name='continent'>
              <option value=''>Ingresa un continente</option>
              {data?.continente.map((cont, i) => <option key={i} value={cont} >{cont} </option>)}
            </select>
            {errors.continent && <span>{errors.continent}</span>}
          </div>
          {values.continent === 'America' &&
            <div>
              <label>Region</label>
              <br />
              <select name='region' onChange={handleChange} onBlur={handleBlur}>
                <option value=''>Ingresa una region</option>
                {data?.region.map((reg, i) => <option key={i} value={reg}>{reg}</option>)}
              </select>
              {errors.region && <span>{errors.region}</span>}
            </div>
          }
        </div>
        <div>
          <button type='submit'>Registro</button>
        </div>
        <div>
          <Link to='/login'>ir al Login</Link>
        </div>
      </form>

    </div>
  )
}
