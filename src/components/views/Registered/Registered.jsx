import React from 'react'
import { useParams } from 'react-router-dom'

export const Registered = () => {
  const { teamID } = useParams()

  return (
    <div className='container'>El team ID de tu equipo es : { teamID }</div>
  )
}


