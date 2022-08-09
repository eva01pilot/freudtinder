import { Chip } from '@mui/material'
import React, { FC } from 'react'
import { auth } from '../../lib/firebase'

const Message:FC<any> = ({content, sender}) => {
  return (
    <>
    <div style={sender!==auth?.currentUser?.uid ? {alignSelf: 'flex-start'}:{alignSelf: 'flex-end'}}
    >
        <Chip variant={sender===auth?.currentUser?.uid ? 'filled' : 'outlined'} label={content}/>
    </div>
    </>
  )
}

export default Message