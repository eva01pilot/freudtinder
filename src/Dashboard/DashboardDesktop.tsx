import React, { FC, useState } from 'react'
import Chats from './Chats';
import Datecard from './Dumb/Card'
import './DashboardDesktop.scss'
import { useGetUser } from '../hooks/useGetUser';
import { auth } from '../lib/firebase';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Profile from './Profile';
import { AnimatePresence } from 'framer-motion';

interface dboardprops{
  [key: string]: any;
}
const DashboardDesktop:FC<dboardprops> = ({users, onClick, chats, handleDragStart, handleDragEnd, animation }) => {
  const me = useGetUser(auth?.currentUser?.uid)
  const [profileShown, setProfileShown] =useState(false)
  return (
    <main className='view'>
      <div className="header">
        <AppBar position="static" sx={{padding:1}}>
          <Toolbar variant="dense">
            <Avatar sx={{ width: 64, height: 64 }} variant='circular' src={me.userr.avatar}/>
            <Typography variant="h4" sx={{ paddingLeft:2 }}>{me.userr.username}</Typography>
            <Button onClick={()=>setProfileShown(!profileShown)}variant="outlined"><AccountBoxIcon sx={{color:'white', fontSize:64}}/></Button>
          </Toolbar>
        </AppBar>
      </div>
      <div className='containerdesk'>
        <div className="chats">
          <Chats  chats={chats}/>
        </div>
      <div className="cardswrapper">
        {!profileShown ? <div className="cards">
        <AnimatePresence>
            {users.map((user:any) => <Datecard  handleDragEnd={handleDragEnd} handleDragStart={handleDragStart} onClick={onClick} user={user} key={user.uid} access={user.uid} />)}
        </AnimatePresence> 
          </div> : <Profile/>
          }
      </div>
      </div>
    </main>
  )
}

export default DashboardDesktop