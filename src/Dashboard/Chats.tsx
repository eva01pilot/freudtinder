import React from 'react'
import Chatrow from './Dumb/Chatrow'
import './Chats.scss'
import { Divider, Typography } from '@mui/material'
const Chats = () => {
    const chats = Array.from(Array(10).keys())
  return (
    <>
      <div className="menu">
        <Typography variant='h4'>
          Ваши чаты
        </Typography>
      </div>
      <div className="chatrowcontainer">
          {chats.map((chat)=>{
              return(
                <>
                  <Chatrow />
                  <Divider/>
                </>
              )
          })}
      </div>
    </>

  )
}

export default Chats