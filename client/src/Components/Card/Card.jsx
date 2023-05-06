import React from 'react'
import './card.css'

export default function Card({nombre,imagen}) {
  return (
    <div className='card'>
        <img src={imagen} alt="Img Not Found" width="200px" height="200px"/>
        <h3>{nombre}</h3>
    </div>
  )
}
