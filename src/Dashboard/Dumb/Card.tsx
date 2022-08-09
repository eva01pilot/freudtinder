import React, { FC } from 'react'
import Card from '@mui/material/Card';
import './Card.scss'
import { CardActions, CardContent, CardMedia,  Fab, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import InfoIcon from '@mui/icons-material/Info';
import { motion } from "framer-motion"

interface userprops{
    [key: string]: any;
    handleDragStart:(e:any, i:any)=>void;
}
export interface actionbutton extends React.ButtonHTMLAttributes<HTMLButtonElement>  {
    access:string;
    value:string;
  }
  interface props extends  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    access:string;
  }
  
const Datecard:FC<userprops> = ({user, onClick, access, handleDragStart, handleDragEnd}) => {
  return (
    <ActionDiv  access={access} className="wrapper">
    <motion.div
        drag
        dragSnapToOrigin 
        dragConstraints={{ left: 10, right: 10, top:10, bottom:10 }}
        dragElastic={0.1}
        onDragStart={(e,i)=>handleDragStart(e,i)} 
        onDragEnd={(e,i)=>handleDragEnd(e,i)} 
      >
        <Card className='card' style={{pointerEvents: 'none'}}>
            <CardMedia component='img' className='cardimg' src={user?.avatar}/>
            <CardContent className='content'>
                <Typography variant='h4'>
                    {user?.username}, {user?.userage}
                </Typography>
            </CardContent>
            <CardActions className='actions'>
                <ActionButton style={{pointerEvents: 'initial'}} access={access} onClick={onClick} value="dislike"> 
                    <HeartBrokenIcon />
                </ActionButton>
                <ActionButton style={{pointerEvents: 'initial'}} access={access} onClick={onClick} value="info" >  
                    <InfoIcon />
                </ActionButton>
                <ActionButton style={{pointerEvents: 'initial'}} access={access} onClick={onClick} value="like" >
                    <FavoriteIcon />
                </ActionButton>
            </CardActions>
        </Card>
    </motion.div>
    </ActionDiv>
  )
}
const ActionButton:FC<actionbutton> = ({...rest}) =>{
    return(
        <button {...rest}/>
    )
}
const ActionDiv:FC<props> = ({...rest}) =>{
    return(
        <div {...rest}/>
    )
}
export default Datecard