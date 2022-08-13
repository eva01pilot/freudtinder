import  { FC, useState } from 'react'
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

const Dashboard:FC = () => {
  const {userArray, updateUserArray} = useGetAllUsers(auth?.currentUser?.uid)
  const isMobile = useMediaQuery({ maxWidth: 767 })
  const {chatsArray} = useGetAllChats()
  const [uid, setUid] = useState('')
  const [offx, setOffx] = useState(0)

  const handleClick = (e:any) => {
    const uid = e.currentTarget.getAttribute('access')
    if(e.target.value==='like'){
      uid && setLikes(uid)
      const getLikes = async() =>{
        const user = await getUserLikes(uid)
        user?.likes && user.likes.indexOf(auth?.currentUser?.uid)!==-1 && setMatch(uid) 
        user?.likes && user.likes.indexOf(auth?.currentUser?.uid)!==-1 && initChat(uid) 
      }
      getLikes() 
      let userscopy = [...userArray]
      userscopy = userscopy.filter(user => user.uid!==e.currentTarget.getAttribute('access'))
      updateUserArray(userscopy)
    }
    if(e.target.value==='dislike'){ 
      let userscopy = [...userArray]
      userscopy = userscopy.filter(user => user.uid!==e.currentTarget.getAttribute('access'))
      updateUserArray(userscopy)
    }
    
  }
  const handleDragStart = (e:any,i:any) => {
    console.log(e.target.parentNode.getAttribute('access'));
    const uid = e.target.parentNode.getAttribute('access')
    setUid(uid)
    setOffx(i.point.x)
  }
  const handleDragEnd = (e:any,i:any) => {
    console.log(i.point.x)
    if(i.point.x-offx > 200){
      uid && setLikes(uid)
      const getLikes = async() =>{
        const user = await getUserLikes(uid)
        user?.likes && user.likes.indexOf(auth?.currentUser?.uid)!==-1 && setMatch(uid) 
        user?.likes && user.likes.indexOf(auth?.currentUser?.uid)!==-1 && initChat(uid) 
      }
      getLikes() 
      let userscopy = [...userArray]
      userscopy = userscopy.filter(user => user.uid!==uid)
      updateUserArray(userscopy)
    } 
    if (offx-i.point.x > 200){
      let userscopy = [...userArray]
      userscopy = userscopy.filter(user => user.uid!==uid)
      updateUserArray(userscopy)
    }
  }
  if(isMobile){
    return(
      <DashboardMobile  chats={chatsArray} users={userArray} onClick={handleClick} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd}/>
    )}
    else {
      return(
      <DashboardDesktop  chats={chatsArray} users={userArray} onClick={handleClick} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />
    )}
  }


export default Dashboard