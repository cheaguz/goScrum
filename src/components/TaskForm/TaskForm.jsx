import React from 'react'
import './TaskForm.styles.css'
import { useTaskForm } from './useTaskForm';
import { RenderSelect } from './RenderSelect';
import { ToastContainer } from 'react-toastify'


export const TaskForm = () => {
    const { handleSubmit, handleBlur, handleChange, errors, touched, values } = useTaskForm()

    const statusValues = [
        {value : "NEW" , text : "Nueva"},
        {value : "IN PROGRESS" , text : "En proceso"},
        {value : "FINISHED" , text : "Terminada"}
    ];

    const importanceValues = [
        { value: "LOW", text: 'Baja' },
        { value: "MEDIUM", text: 'Media' },
        { value: "HIGH", text: 'Alta' }
    ];

    return (
        <>
            
            <section className='task-form'>
            <h2>Crear tarea</h2>
            <p>Crea tus tareas</p>
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
                        <RenderSelect 
                            value={values.status}
                            name ={'status'}
                            className={errors.status ? 'err' : ''}
                            text={'Seleccionar un estado'}
                            options={statusValues}
                            errors={errors.status}
                            touched={touched.status}
                            handleChange={handleChange}
                            handleBlur = {handleBlur} 

                        />
                        <RenderSelect 
                            value={values.importance}
                            name ={'importance'}
                            className={errors.importance ? 'err' : ''}
                            text={'Seleccionar una prioridad'}
                            options={importanceValues}
                            errors={errors.importance}
                            touched={touched.importance}
                            handleChange={handleChange}
                            handleBlur = {handleBlur} 
                        />
                    </div>
                    <div>
                        <textarea value={values.description} name='description' onChange={handleChange} placeholder='Descripcion...' className={errors.description ? 'err' : ''} />
                        {errors.description && touched.description && <span className='error'>{errors.description}</span>}
                    </div>
                    <button type='submit'>Crear</button>
                </form>
                <ToastContainer />
            </section>
        </>

    )
}