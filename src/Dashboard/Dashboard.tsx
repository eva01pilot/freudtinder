import  { FC } from 'react'
import { useMediaQuery } from 'react-responsive'
import { getUserLikes } from '../helpers/getUserLikes'
import { initChat } from '../helpers/initChat'
import { setLikes } from '../helpers/setLikes'
import { setMatch } from '../helpers/setMatch'
import { useGetAllChats } from '../hooks/useGetAllChats'
import { useGetAllUsers } from '../hooks/useGetAllUsers'
import { auth } from '../lib/firebase'
import DashboardDesktop from './DashboardDesktop'
import DashboardMobile from './DashboardMobile'
import Datecard from './Dumb/Card'
const Dashboard:FC = () => {
  const {userArray, updateUserArray} = useGetAllUsers(auth?.currentUser?.uid)
  const isMobile = useMediaQuery({ maxWidth: 767 })
  const {chatsArray} = useGetAllChats()

  const handleClick = (e:any) => {
    const uid = e.currentTarget.getAttribute('access')
    console.log(uid)
    if(e.target.getAttribute('aria-label')==='like'){
      uid && setLikes(uid)
      const getLikes = async() =>{
        const user = await getUserLikes(uid)
        console.log(user?.likes)
        user?.likes && user.likes.indexOf(auth?.currentUser?.uid)!==-1 && setMatch(uid) 
        user?.likes && user.likes.indexOf(auth?.currentUser?.uid)!==-1 && initChat(uid) 
      }
      getLikes() 
    }
    let userscopy = [...userArray]
    userscopy = userscopy.filter(user => user.uid!==e.currentTarget.getAttribute('access'))
    updateUserArray(userscopy)
  }
  if(isMobile){
    return(
      <DashboardMobile chats={chatsArray} users={userArray} onClick={handleClick}/>
    )}
    else {
      return(
      <DashboardDesktop><Datecard/></DashboardDesktop>
    )}
  }


export default Dashboard