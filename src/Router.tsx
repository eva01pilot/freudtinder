import React, { FC } from 'react'
import { useContext } from 'react'
import Dashboard from './Dashboard/Dashboard'
import { UserContext } from './lib/context'
import LoginForm from './LoginForm/LoginForm'
import LoginPage from './LoginPage/LoginPage'
const Router:FC = () => {
    const user = useContext(UserContext)
  return (
    <>
        {user.user ?
            !user.username ? <LoginForm /> : <Dashboard />
            :<LoginPage /> 
        }
    </>
  )
}

export default Router