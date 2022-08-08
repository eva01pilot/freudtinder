import {  Typography } from '@mui/material'

import './Chatrow.scss'
const Chatrow = () => {
  return (
    <div className='chatrow'>
        <div className="avatarcontainer">
          <img className='avatar'  alt="Remy Sharp" src="https://firebasestorage.googleapis.com/v0/b/freudtinder.appspot.com/o/uploads%2FMVVMuMbkEtRI82drMordrUtLid23%2F1659901408828.jpeg?alt=media&token=2beee072-22ba-43bf-8f3f-7ed6a6e12a2f" />
        </div>
        <Typography className='chatname' variant="h4">Илья</Typography>
    </div>
  )
}

export default Chatrow