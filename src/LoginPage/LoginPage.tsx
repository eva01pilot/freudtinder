import { Typography } from '@mui/material'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React, { FC, useContext } from 'react'
import { UserContext } from '../lib/context'
import { auth } from '../lib/firebase'
import './LoginPage.scss'
const LoginPage:FC = () => {
  const {user,username} = useContext(UserContext)
  const handleLogin = async() =>{
    await signInWithPopup(auth, new GoogleAuthProvider())
  }
  return (
    <div className='flex-center fullview bg-login'>
      <div className="textblocklogin"> 
        <Typography className='loginh1' >Вступите в Freud`Tinder</Typography>
        <Typography className='loginh2' >Чтобы найти фигуру Отца</Typography>
        {user===null && <div><button className='loginbtn' onClick={handleLogin}><img src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' alt=''/>Вход с помощью Google</button></div>}
      </div>
    </div>
  )
}

export default LoginPage