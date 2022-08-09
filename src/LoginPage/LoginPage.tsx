import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React, { FC, useContext } from 'react'
import { UserContext } from '../lib/context'
import { auth } from '../lib/firebase'

const LoginPage:FC = () => {
  const {user,username} = useContext(UserContext)
  const handleLogin = async() =>{
    await signInWithPopup(auth, new GoogleAuthProvider())
  }
  return (
    <>
    {user===null && <div><button onClick={handleLogin}>Log in with Google</button></div>}
    </>
  )
}

export default LoginPage