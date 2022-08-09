import { Typography } from '@mui/material'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useState } from 'react'
import FormEdit from '../Dumb/Formedit'
import { useGetUser } from '../hooks/useGetUser'
import { auth, STATE_CHANGED, storage } from '../lib/firebase'
import Datecard from './Dumb/Card'
import './Profile.scss'

const Profile = () => {
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
      console.log(file)
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
  return (
    <div className='view'>
      <div className="headingwrapper">
        <Typography variant='h5' sx={{marginBottom:'1rem'}}>Ваша карточка</Typography>
      </div>
      <div className="bodywrapper">
        {previewShown ? <FormEdit 
        userage={userr.userage} 
        username={userr.username} 
        usergender={userr.usergender} 
        userdescription={userr.userdescription} 
        avatar={userr.avatar}
        onChange={handleChange}
        uploadFile={uploadFile}
        />
         : 
        <Datecard user={userr}/>
      }
      </div>
      <div className="footerwrapper">
        <button onClick={()=>setPreviewShown(!previewShown)}>
          <>
          {!previewShown ? <Typography  variant='button'>Редактировать карточку</Typography> : <Typography variant='button'>Превью карточки</Typography>}
          </>
        </button>
      </div>
    </div>
  )
}

export default Profile