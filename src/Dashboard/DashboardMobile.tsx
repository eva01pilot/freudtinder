import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import PersonIcon from '@mui/icons-material/Person';
import './DashboardMobile.scss'
import { FC, useState } from 'react';
import Datecard from './Dumb/Card';
import Chats from './Chats';
import Profile from './Profile';

interface dboardprops{
  [key: string]: any;
}

const DashboardMobile:FC<dboardprops> = ({users, onClick }) => {
  const [viewmode, setViewmode] = useState('cards')
  return (
    <main className='view'>
        <div className='container'>
          {viewmode === 'cards' ? users.map((user:any) => <Datecard onClick={onClick} user={user} key={user.uid} access={user.uid} />) : 
          viewmode === 'chat' ? <Chats/> 
          : <Profile/>
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