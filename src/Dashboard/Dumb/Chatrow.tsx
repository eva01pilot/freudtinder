import {  Typography } from '@mui/material'
import { FC } from 'react'
import './Chatrow.scss'

interface chatrowprops{
  user: any
  onClick?:any
  [key: string]: any
}

const Chatrow:FC<chatrowprops> = ({user, onClick}) => {
  return (
    <div className='chatrow' onClick={onClick}>
        <div className="avatarcontainer">
          <img className='avatar' alt='' src={user.avatar} />
        </div>
        <Typography className='chatname' variant="h4">{user.username}</Typography>
    </div>
  )
} 

export default Chatrow 