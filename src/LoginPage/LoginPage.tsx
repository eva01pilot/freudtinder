import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React, { FC } from 'react'
import { auth } from '../lib/firebase'

const LoginPage:FC = () => {
  const handleLogin = async() =>{
    await signInWithPopup(auth, new GoogleAuthProvider())
  }
  return (
    <div><button onClick={handleLogin}>Log in with Google</button></div>
  )
}

export default LoginPage