import { useState } from 'react'
import Chatrow from './Dumb/Chatrow'
import './Chats.scss'
import { Divider, Typography } from '@mui/material'
import Chatwindow from './Chatwindow'
import { useMediaQuery } from 'react-responsive'

const Chats = ({chats}:any) => {
  const [chatShown, setChatShown] = useState<null|any>(null) 
  const isMobile = useMediaQuery({ maxWidth: 767 })
  return (
    <> 
      {!chatShown && <div className={isMobile ? "menu" : "menudesk"}>
        <Typography variant='h4'>
          Ваши чаты
        </Typography>
      </div> }
      <div className={isMobile ? "chatorrowcontainer" : "chatorrowcontainerdesk"}>
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