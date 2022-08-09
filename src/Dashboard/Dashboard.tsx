import  { FC, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { getUserLikes } from '../helpers/getUserLikes'
import { initChat } from '../helpers/initChat'
import { setLikes } from '../helpers/setLikes'
import { setMatch } from '../helpers/setMatch'
import { useGetAllChats } from '../hooks/useGetAllChats'
import { useGetAllUsers } from '../hooks/useGetAllUsers'
import { auth } from '../lib/firebase'
import DashboardMobile from './DashboardMobile'

const Dashboard:FC = () => {
  const {userArray, updateUserArray} = useGetAllUsers(auth?.currentUser?.uid)
  const isMobile = useMediaQuery({ maxWidth: 767 })
  const {chatsArray} = useGetAllChats()
  const [uid, setUid] = useState('')

  const handleClick = (e:any) => {
    const uid = e.currentTarget.getAttribute('access')
    if(e.target.value==='like'){
      uid && setLikes(uid)
      const getLikes = async() =>{
        const user = await getUserLikes(uid)
        console.log(user?.likes)
        user?.likes && user.likes.indexOf(auth?.currentUser?.uid)!==-1 && setMatch(uid) 
        user?.likes && user.likes.indexOf(auth?.currentUser?.uid)!==-1 && initChat(uid) 
        console.log('queen')
      }
      getLikes() 
      let userscopy = [...userArray]
      userscopy = userscopy.filter(user => user.uid!==e.currentTarget.getAttribute('access'))
      updateUserArray(userscopy)
    }
    console.log(2)
  }
  const handleDragStart = (e:any,i:any) => {
    console.log(e.target.parentNode.getAttribute('access'));
    const uid = e.target.parentNode.getAttribute('access')
    setUid(uid)
  }
  const handleDragEnd = (e:any,i:any) => {
    console.log(1)
    if(i.point.x>300){
      uid && setLikes(uid)
      const getLikes = async() =>{
        const user = await getUserLikes(uid)
        console.log(user?.likes)
        user?.likes && user.likes.indexOf(auth?.currentUser?.uid)!==-1 && setMatch(uid) 
        user?.likes && user.likes.indexOf(auth?.currentUser?.uid)!==-1 && initChat(uid) 
        console.log('yass')
      }
      getLikes() 
      let userscopy = [...userArray]
      userscopy = userscopy.filter(user => user.uid!==uid)
      updateUserArray(userscopy)
    } 
    if (i.point.x<100){
      let userscopy = [...userArray]
      userscopy = userscopy.filter(user => user.uid!==uid)
      updateUserArray(userscopy)
    }
  }
  if(isMobile){
    return(
      <DashboardMobile chats={chatsArray} users={userArray} onClick={handleClick} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd}/>
    )}
    else {
      return(
        <></>
      //<DashboardDesktop><Datecard/></DashboardDesktop>
    )}
  }


export default Dashboard