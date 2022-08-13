import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import PersonIcon from '@mui/icons-material/Person';
import './DashboardMobile.scss'
import { FC, useState } from 'react';
import Datecard from './Dumb/Card';
import Chats from './Chats';
import Profile from './Profile';
import { AnimatePresence } from 'framer-motion';

interface dboardprops{
  [key: string]: any;
}

const DashboardMobile:FC<dboardprops> = ({users, onClick, chats, handleDragStart, handleDragEnd }) => {
  const [viewmode, setViewmode] = useState('cards')
  return (
    <main className='view'>
        <div className='container'>
          {viewmode === 'cards' ? 
          <div className="cards">
            <AnimatePresence>
            {users.map((user:any) => <Datecard handleDragEnd={handleDragEnd} handleDragStart={handleDragStart} onClick={onClick} user={user} key={user.uid} access={user.uid} />)}
            </AnimatePresence>
          </div>
          
           : 
          viewmode === 'chat' ? <Chats  chats={chats}/> 
          : <Profile handleDragStart={handleDragStart}/>
          }
        </div>
        <BottomNavigation
            className='nav'
            showLabels
        >
            <BottomNavigationAction  onClick={()=>setViewmode('chat')} icon={<ChatBubbleIcon />} />
            <BottomNavigationAction  onClick={()=>setViewmode('cards')} icon={<FavoriteIcon />} />
            <BottomNavigationAction  onClick={()=>setViewmode('profile')} icon={<PersonIcon />} />
        </BottomNavigation>
    </main>
  )
}

export default DashboardMobile