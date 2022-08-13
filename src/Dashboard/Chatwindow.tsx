import { Divider, TextareaAutosize } from "@mui/material"
import { FC, useEffect, useRef, useState } from "react"
import Chatrow from "./Dumb/Chatrow"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './Chatwindow.scss'
import { useGetAllMessages } from "../hooks/useGetAllMessages";
import Message from "./Dumb/Message";
import { sendMessage } from "../helpers/sendMessage";
import SendIcon from '@mui/icons-material/Send';
import { useMediaQuery } from 'react-responsive'


const Chatwindow:FC<any> = ({user, onClick}) => {
    const isMobile = useMediaQuery({ maxWidth: 767 })
    const messagesEndRef =  useRef<HTMLDivElement>(null)
    const messages = useGetAllMessages(user.uid)
    const [input, setInput] = useState('')
    const handleSubmitMessage = (e:any) =>{
        e.preventDefault()
        sendMessage(user.uid,input)
        setInput('')
    }
    useEffect(()=>{
        if(messagesEndRef.current){
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    })
  return (
    <>   
    <section className='bg-dark d-flex-row'>
        <button onClick={onClick} className='goback'>
            <ArrowBackIcon />
        </button>
        <Chatrow user={user}/>
        <Divider/>
    </section>
    <section className='d-flex-col'>
        {messages.map(message => <Message content={message.text} sender={message.sender}/>)}
        <div ref={messagesEndRef}/>
    </section>
    
    <section className='formfooter'>
    <form onSubmit={handleSubmitMessage} className='msgform'>
        <TextareaAutosize maxRows={4}  className={isMobile ?'textarea' :'textareadesk'} value={input} onChange={(e:any)=>{setInput(e.target.value);console.log(input)}} required/>  
        <button type="submit" className='submitmsg'> <SendIcon/> </button>
    </form>
    </section>
    </>
  )
}

export default Chatwindow