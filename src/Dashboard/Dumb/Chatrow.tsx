import {  Typography } from '@mui/material'
import { FC } from 'react'
import './Chatrow.scss'
import { useMediaQuery } from 'react-responsive'

interface chatrowprops{
  user: any
  onClick?:any
  [key: string]: any
}

const Chatrow:FC<chatrowprops> = ({user, onClick}) => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  return (
    <div className={isMobile ? 'chatrow' :'chatrowdesk'} onClick={onClick}>
        <div className="avatarcontainer">
          <img className='avatar' alt='' src={user.avatar} />
        </div>
        <Typography className='chatname' variant="h4">{user.username}</Typography>
    </div>
  )
} 

export default Chatrow 