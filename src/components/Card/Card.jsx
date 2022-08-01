import React, { useState } from 'react'
import { limitString } from '../../utils/limitString'

export const Card = ({ data, deleteCard, editCardStatus }) => {
  const [showMore, setShowMore] = useState(false)
  const { title, createdAt, user: { userName }, description, status, importance, _id } = data

  const datetime = new Date(createdAt).toLocaleString();


  return (
    <div className="card">
      <div className='close' onClick={() => { deleteCard(_id) }}>x</div>
      <h3>{title}</h3>
      <h6>{datetime}</h6>
      <h5>{userName}</h5>
      <button type='button' className={status.replace(/ /g, "")} onClick={() => editCardStatus(data)}>{status}</button>
      <button type='button' className={importance}>{importance}</button>
      {!showMore && <p>{limitString(description).string}</p>}
      {showMore && <><p>{description}</p><button onClick={() => setShowMore(false)}> ver menos</button> </>}

      {!showMore && limitString(description).addButton && <button type='button'
        onClick={() => setShowMore(true)}
      >Ver mas</button>}
    </div>
  )
}
