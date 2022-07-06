import './App.css'
import React ,{ lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion';

import { Login } from './components/views/auth/Login/Login';
import { Tasks } from './components/views/Tasks/Tasks';
import { Register } from './components/views/auth/Register/Register';
import { Registered } from './components/views/Registered/Registered';
import { Donate } from './components/views/donate/Donate';

const Error404 = lazy(()=>import('./components/views/Error404/Error404') )


const RequireAuth = ({children}) => {
  if(!sessionStorage.getItem('token')){
    return <Navigate  to='/login' replace={true} />
  }
  return children
};

const pageTransition = {
  in : {
    opacity : 1
  },
  out : {
    opacity : 0
  }
};

const Animation = ({ children }) => {
  return <motion.div
    className='page'
    initial='out'
    animate='in'
    exit='out'
    variants={pageTransition}>
    {children}
  </motion.div>
}

function App() {
  const location = useLocation()
  return (
    
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={ <RequireAuth> <Animation> <Tasks /> </Animation> </RequireAuth>  } />
        <Route path='/login' element={ <Animation> <Login /> </Animation> } />
        <Route path='/register' element={ <Animation> <Register /> </Animation> } />
        <Route path='/registered/:teamID' element={ <Animation><Suspense fallback={<h1 className='container'>...</h1>}><Registered /> </Suspense></Animation> } />
        <Route path='*' element={ <Animation><Suspense fallback={<h1 className='container'>...</h1>}><Error404 /> </Suspense></Animation> } />
        <Route path='/donate' element={ <Animation> <Donate /> </Animation> } />
      </Routes>
    </AnimatePresence>
  )
}

export default App
