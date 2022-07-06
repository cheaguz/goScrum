import React from 'react'
import './TaskForm.styles.css'
import 'react-toastify/dist/ReactToastify.css'
import { newTask } from "../../api/taskServices";

import { ToastContainer, toast } from 'react-toastify'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import { useFormik } from 'formik'
import * as Yup from 'yup';

export const TaskForm = () => {
    const initialValues = {
        title: '',
        status: '',
        importance: '',
        description: ''
    }


    const onSubmit = () => {
        newTask(values)
            .then(response => response.json())
            .then(data => {
                if(data.status_code===200){
                    resetForm()
                    toast('Tu tarea se creo')
                }
                
            })
            .catch(err => alert('Hubo un error..'))
    }

    const validation = '* El campo es requerido'
    const validationSchema = Yup.object().shape({
        title: Yup.string().min(6, 'La cantidad minima de caracteres es 6').required('El titulo es requerido'),
        status: Yup.string().required(validation),
        importance: Yup.string().required(validation),
        description: Yup.string().max(140, 'El maximo es 140 caracteres').required(validation),
    })

    const formik = useFormik({ initialValues, validationSchema, onSubmit })
    const { handleSubmit, handleBlur, handleChange, errors, touched, resetForm, values } = formik



    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <h2>Crear tarea</h2>
            </AccordionSummary>
            <AccordionDetails>
                <section className='task-form'>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div>
                                <input name='title'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='Titulo..'
                                    className={errors.title ? 'err' : ''}
                                    value={values.title} />
                                {errors.title && touched.title && <span className='error'>{errors.title}</span>}
                            </div>
                            <div>
                                <select value={values.status} name='status' onChange={handleChange} onBlur={handleBlur} className={errors.status ? 'err' : ''}>
                                    <option value="">Seleccionar un estado</option>
                                    <option value="NEW">Nueva</option>
                                    <option value="IN PROGRESS">En proceso</option>
                                    <option value="FINISHED">Terminada</option>
                                </select>
                                {errors.status && touched.status && <span className='error'>{errors.status}</span>}
                            </div>
                            <div>
                                <select value={values.importance} name='importance' onChange={handleChange} onBlur={handleBlur} className={errors.importance ? 'err' : ''}>
                                    <option value="">Seleccionar una prioridad</option>
                                    <option value="LOW">Baja</option>
                                    <option value="MEDIUM">Media</option>
                                    <option value="HIGH">Alta</option>
                                </select>
                                {errors.importance && touched.importance && <span className='error'>{errors.importance}</span>}
                            </div>
                        </div>
                        <div>
                            <textarea value={values.description} name='description' onChange={handleChange} placeholder='Descripcion...' className={errors.description ? 'err' : ''} />
                            {errors.description && touched.description && <span className='error'>{errors.description}</span>}
                        </div>
                        <button type='submit'>Crear</button>
                    </form>
                    <ToastContainer />
                </section>
            </AccordionDetails>
        </Accordion>

    )
}


