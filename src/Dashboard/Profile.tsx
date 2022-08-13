import { Typography } from '@mui/material'
import { doc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import FormEdit from '../Dumb/Formedit'
import { useGetUser } from '../hooks/useGetUser'
import { auth, firestore, STATE_CHANGED, storage } from '../lib/firebase'
import Datecard from './Dumb/Card'
import './Profile.scss'

const Profile = ({handleDragStart}:any) => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  const [previewShown, setPreviewShown] = useState(false)
  const {userr, updateUser} = useGetUser(auth?.currentUser?.uid)
  const handleChange = (event: any) => {
    switch(event.target.id){
      case 'name':{
        updateUser({
          ...userr,
          username:event.target.value
        })
        break
      }
      case 'age':{
        updateUser({
          ...userr,
          userage:event.target.value
        })
        break
      }
      
      case 'description':{
        updateUser({
          ...userr,
          userdescription:event.target.value
        })
        break
      }
    }
    }
    
    const uploadFile = async (e:any)=>{
      const file = Array.from(e.target.files)[0]
      const ext = (file as any).type.split('/')[1]
      const fileRef = ref(storage, `uploads/${auth?.currentUser?.uid}/${Date.now()}.${ext}`)
      const task = uploadBytesResumable(fileRef, file as any)
    
      task.on(STATE_CHANGED, () => {
        task
          .then(() => getDownloadURL(fileRef))
          .then((url:any) => {
            updateUser({
              ...userr,
              avatar:url
            });
          });
      });
    }
    const handleSubmit = (event: any) => {
      event.preventDefault();
      const userRef = doc(firestore,`users/${auth.currentUser?.uid}`)
      updateDoc(userRef,{
        uid: auth.currentUser?.uid,
        username : userr.username,
        userage: userr.userage,
        userdescription: userr.userdescription,
        avatar:userr.avatar,
      })
    }
  return (
    <>
      <div className="headingwrapper">
        <Typography variant='h5' sx={{marginBottom:'1rem'}}>Ваша карточка</Typography>
      </div>
    {isMobile ? <div className="bodywrapper">
        {previewShown ? <FormEdit 
        userage={userr.userage} 
        username={userr.username} 
        usergender={userr.usergender} 
        userdescription={userr.userdescription} 
        avatar={userr.avatar}
        onChange={handleChange}
        uploadFile={uploadFile}
        onSubmit={handleSubmit}
        />
         : 
        <Datecard handleDragStart={handleDragStart} user={userr}/>
      }
      </div> :
      <div className="bodywrapper"> 
      <FormEdit 
        userage={userr.userage} 
        username={userr.username} 
        usergender={userr.usergender} 
        userdescription={userr.userdescription} 
        avatar={userr.avatar}
        onChange={handleChange}
        uploadFile={uploadFile}
        onSubmit={handleSubmit}
        /> 
        <Datecard handleDragStart={handleDragStart} user={userr}/>
        </div>
        }
      
      {isMobile &&
      <div className="footerwrapper">
        <button onClick={()=>setPreviewShown(!previewShown)}>
          <>
          {!previewShown ? <Typography  variant='button'>Редактировать карточку</Typography> : <Typography variant='button'>Превью карточки</Typography>}
          </>
        </button>
      </div>
      }
      </>
  )
}

export default Profile