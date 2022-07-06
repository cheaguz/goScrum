import './Tasks.styles.css'
import React, { useState, useEffect } from 'react'
import { Header } from '../../Header/Header'
import { useResize } from '../../../hooks/useResize'
import { Card } from '../../Card/Card';
import { TaskForm } from '../../TaskForm/TaskForm';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { FormControl , RadioGroup , FormControlLabel, Radio } from '@mui/material'
import debounce from 'lodash.debounce';
import { useSelector,useDispatch } from 'react-redux'
import { getTasks,deleteTask, editTaskStatus } from '../../../store/actions/taskActions';

export const Tasks = () => {
  const [list , setList] = useState();
  const [renderList , setRenderList] = useState();
  const [userTask , setUserTask] = useState('ALL');
  const [search , setSearch] = useState('')
  const { isPhone } = useResize()
  const dispatch = useDispatch();

  const { loading , error , task } = useSelector(state => {
    return state.tasksReducer
  })
  const user = sessionStorage.getItem('user')

  useEffect(()=>{
    dispatch( getTasks() )
  },[dispatch])

  useEffect(()=> {
    if(task?.length){
      setList(task)
      setRenderList(task)
    }
  },[task])

  useEffect(()=> {
    if(search){
      setRenderList(list.filter(li => li.title.toLowerCase().startsWith(search.toLowerCase())) )
    }else {
      setRenderList(list)
    }
  },[search])

const renderAllCards = ()=>{
  return renderList?.map(data => <Card key={data._id} data={data} deleteCard={handleDeleteCard} editCardStatus={editCardStatus}/>);
}

const conditionalRender = (type) => {
  return renderList?.filter(task => task.status === type).map(data => <Card key={data._id} data={data} deleteCard={handleDeleteCard} editCardStatus={editCardStatus} />)
}

  const importanceFilter = (value) => {
    if (value === 'ALL') {
      if (userTask === 'ME') {
        setRenderList(list.filter(li => li.user.userName === user))
      } else {
        setRenderList(list)
      }
    } else {
      if (userTask === 'ME') {
        setRenderList(list.filter(li => li.importance === value && li.user.userName === user))
      } else {
        setRenderList(list.filter(li => li.importance === value))
      }
    }
  };

  const userFilter = (value) => {
    if(value === 'ALL'){
      setRenderList(list)
    }else{ 
      setUserTask('ME')
      setRenderList(list.filter(li => li.user.userName === user))
    }
  };

  const handleSearch = debounce(event => {
    setSearch(event?.target?.value)
  },1000)
  
  const handleDeleteCard = id => dispatch(deleteTask(id))
  const editCardStatus = data => dispatch(editTaskStatus(data))

  return (
    <>
    <Header />
    <TaskForm />
      <main id='tasks'>
        <section className='wrapper_list'>
          <div className='list_header'>
            <h2>Mis tareas</h2>
          </div>
          <div className='filters'>
            <FormControl>
              <RadioGroup
              row
              onChange={ (e)=>{userFilter(e.target.value) } } >
                <FormControlLabel 
                  value='ALL'
                  control={ <Radio sx={{'&.Mui-checked': { color: '#ff452b',}}} /> }
                  label='Todas'
                  
                />
                <FormControlLabel 
                  value='ME'
                  control={ <Radio sx={{'&.Mui-checked': { color: '#ff452b',}}} /> }
                  label='Mis tareas'
                />
              </RadioGroup>
            </FormControl>
            <div className='search'>
              <input type='text' placeholder='buscar por titulo' onChange={handleSearch}/>
            </div>
            <select name='importance' onChange={(e)=> {importanceFilter(e.target.value)} }>
              <option value="">Seleccionar una prioridad</option>
              {['ALL','LOW','MEDIUM','HIGH'].map( (importance,i)=> (
                <option key={i} value={importance}>{importance}</option>
              ) )}
            </select>
          </div>
          {isPhone ?
          
            <div className='list phone'>
              { loading && <Skeleton />}
             {renderAllCards()}
            </div>
            :
            <div className='list_group'>
              <div className='list'>
                <h4>Nuevas</h4>
                { loading && <Skeleton />}
                   {conditionalRender('NEW')}
              </div>

              <div className='list'>
                <h4>En proceso</h4>
                { loading && <Skeleton />}
                  {conditionalRender('IN PROGRESS')}
              </div>

              <div className='list'>
                <h4>Finalizadas</h4>
                { loading && <Skeleton />}
                {conditionalRender('FINISHED')}
              </div>

            </div>

          }
        </section>
      </main>
    </>
  )
}
