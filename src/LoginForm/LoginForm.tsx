import { Paper, Typography } from '@mui/material';
import { doc, setDoc } from 'firebase/firestore';
import  { FC, useState } from 'react'
import Form from '../Dumb/Form';
import { auth, firestore, STATE_CHANGED, storage } from '../lib/firebase';
import './LoginForm.scss'

import freud from '../assets/freud.svg'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useMediaQuery } from 'react-responsive';


const LoginForm:FC = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  const [username, setUsername] = useState('')
  const [userage, setUserage] = useState(0)
  const [usergender, setUsergender] = useState('')
  const [userdescription, setUserdescription] = useState('')
  const [downloadURL, setDownloadURL] = useState('')

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const userRef = doc(firestore,`users/${auth.currentUser?.uid}`)
    setDoc(userRef,{
      uid: auth.currentUser?.uid,
      username,
      userage,
      usergender,
      userdescription,
      avatar:downloadURL,
      likes:[],
      matches:[]
    })
  }
  const handleChange = (event: any) => {
    switch(event.target.id){
      case 'name':{
        setUsername(event.target.value)
        break
      }
      case 'age':{
        setUserage(event.target.value)
        break
      }
      case 'gender':{
        setUsergender(event.target.value)
        break
      }
      case 'description':{
        setUserdescription(event.target.value)
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
        setDownloadURL(url);
      });
  });
}
  return (
    <main>
      <Paper className='formpaper' elevation={10}>
        <div className="logoandcaption">
          <img className='logo' src={freud} alt=''/>
          <Typography variant={!isMobile ? 'h3' :  'h4'}>
            Freud`Tinder
          </Typography>
        </div>
        <Form onSubmit={handleSubmit} onChange={handleChange} avatar={downloadURL} username={username} userage={userage} usergender={usergender} userdescription={userdescription} uploadFile={uploadFile} />   
      </Paper>  
      {downloadURL}
    </main>

  )
}

export default LoginForm