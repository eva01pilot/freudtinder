import  { FC } from 'react'
import { auth } from '../../lib/firebase'
import './Message.scss'
const Message:FC<any> = ({content, sender}) => {
  return (
    <>
    <div className='message' style={sender!==auth?.currentUser?.uid ? 
      {alignSelf: 'flex-start', marginLeft: '2rem' ,textAlign: 'start'}
      :{alignSelf: 'flex-end', marginRight: '2rem',textAlign: 'end'}}>
        {content}
    </div>
    </>
  )
}

export default Message