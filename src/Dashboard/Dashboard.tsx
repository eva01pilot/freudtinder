import  { FC } from 'react'
import { useMediaQuery } from 'react-responsive'
import { getUserLikes } from '../helpers/getUserLikes'
import { setLikes } from '../helpers/setLikes'
import { setMatch } from '../helpers/setMatch'
import { useGetAllUsers } from '../hooks/useGetAllUsers'
import { useGetUser } from '../hooks/useGetUser'
import { auth } from '../lib/firebase'
import DashboardDesktop from './DashboardDesktop'
import DashboardMobile from './DashboardMobile'
import Datecard from './Dumb/Card'
const Dashboard:FC = () => {
  const {userArray, updateUserArray} = useGetAllUsers(auth?.currentUser?.uid)
  const isMobile = useMediaQuery({ maxWidth: 767 })

  const handleClick = (e:any) => {
    const uid = e.currentTarget.getAttribute('access')
    if(e.target.getAttribute('aria-label')==='like'){
      uid && setLikes(uid)
      const getLikes = async() =>{
        const user = await getUserLikes(uid)
        console.log(user?.likes)
        user?.likes && user.likes.indexOf(auth?.currentUser?.uid)!==-1 && setMatch(uid) 
      }
      getLikes()
      
      
    }
    
    let userscopy = [...userArray]
    userscopy = userscopy.filter(user => user.uid!==e.currentTarget.getAttribute('access'))
    updateUserArray(userscopy)
  }
  if(isMobile){
    return(
      <DashboardMobile users={userArray} onClick={handleClick}/>
    )}
    else {
      return(
      <DashboardDesktop><Datecard/></DashboardDesktop>
    )}
  }


export default Dashboard