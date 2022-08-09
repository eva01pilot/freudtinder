import { useState } from 'react'
import Chatrow from './Dumb/Chatrow'
import './Chats.scss'
import { Divider, Typography } from '@mui/material'
import Chatwindow from './Chatwindow'

const Chats = ({chats}:any) => {
  const [chatShown, setChatShown] = useState<null|any>(null) 
  return (
    <> 
      {!chatShown && <div className="menu">
        <Typography variant='h4'>
          Ваши чаты
        </Typography>
      </div> }
      <div className="chatorrowcontainer">
          {!chatShown && chats.map((chat:any)=>{
              return(
                <>
                  <Chatrow user={chat} 
                  key={chat?.uid} onClick={()=>setChatShown(chat)}/>
                  <Divider/>
                </>
              )
           
          })}
          {chatShown && <Chatwindow user={chatShown} onClick={()=>setChatShown(null)}/>}
      </div>
    </>

  )
}

export default Chats