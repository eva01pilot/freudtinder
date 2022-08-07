import { Paper, Typography } from '@mui/material';
import { doc, setDoc } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react'
import Form from '../Dumb/Form';
import { auth, firestore } from '../lib/firebase';
import './LoginForm.scss'

import freud from '../assets/freud.svg'

const LoginForm:FC = () => {
  
  const [username, setUsername] = useState('')
  const [userage, setUserage] = useState(0)
  const [usergender, setUsergender] = useState('')
  const [userdescription, setUserdescription] = useState('')
  useEffect(()=>{
    console.log(username)
    console.log(usergender)
  })
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const userRef = doc(firestore,`users/${auth.currentUser?.uid}`)
    setDoc(userRef,{
      username,
      userage,
      usergender,
      userdescription,
      likes:[],
      matches:[]
    })
  }
  const handleChange = (event: any) => {
    switch(event.target.id){
      case 'name':{
        setUsername(event.target.value)
        break
      }
      case 'age':{
        setUserage(event.target.value)
        break
      }
      case 'gender':{
        setUsergender(event.target.value)
        break
      }
      case 'description':{
        setUserdescription(event.target.value)
        break
    }
  }
}
  return (
    <main>
      <Paper className='formpaper' elevation={10}>
        <div className="logoandcaption">
          <img className='logo' src={freud} alt=''/>
          <Typography variant='h3'>
            Freud`Tinder
          </Typography>
        </div>
        <Form onSubmit={handleSubmit} onChange={handleChange} username={username} userage={userage} usergender={usergender} userdescription={userdescription} />   
      </Paper>  
    </main>
  )
}

export default LoginForm