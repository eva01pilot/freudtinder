import React, { FC, useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import './Card.scss'
import { CardActions, CardContent, CardMedia,  Fab, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import InfoIcon from '@mui/icons-material/Info';
import { AnimatePresence, motion } from "framer-motion"

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
  
const Datecard:FC<userprops> = ({user, onClick, access, handleDragStart, handleDragEnd, animation}) => {
    const [infoShown, setInfoShown] = useState(false)
    const [anim, setAnim] = useState<'left' | 'right'>('left')
    const [xstart, setXstart] = useState(0)
  return (
    <motion.div
        initial={{  }}
        animate={{ opacity: 1 }}
        exit={anim==='left'?{transform: `translate(-100px) rotate(-20deg)`, opacity: 0}:{transform: `translate(100px) rotate(20deg)`, opacity: 0}}
        >
            {animation}
    <ActionDiv  access={access} className="wrapper">
    <motion.div
        key={user?.uid}
        drag
        dragSnapToOrigin 
        dragConstraints={{ left: 10, right: 10, top:10, bottom:10 }}
        dragElastic={0.1}
        onDragStart={(e,i)=>{setXstart(i.point.x) ;handleDragStart(e,i)}} 
        onDragEnd={(e,i)=>{
            i.point.x-xstart > 200 && setAnim('right')
            xstart-i.point.x >200 && setAnim('left')
            handleDragEnd(e,i)}} 
      >
        <Card className='card' style={{pointerEvents: 'none'}}>
            <CardMedia component='img' className={infoShown ?'cardimg dontshow' : 'cardimg'} src={user?.avatar}/>
            {infoShown && <CardContent className='content show'>
                <Typography variant='body1'>
                    {user?.userdescription}
                </Typography>
            </CardContent>}
            <CardContent className='content'>
                <Typography variant='h4'>
                    {user?.username}, {user?.userage}
                </Typography>
            </CardContent>
            <CardActions className='actions'>
                <ActionButton className='actionbtn' style={{pointerEvents: 'initial', color:'gray'}} access={access} onClick={onClick} value="dislike"> 
                    <HeartBrokenIcon />
                </ActionButton>
                <ActionButton className='actionbtn' style={{pointerEvents: 'initial', color:'blue'}} access={access} onClick={()=>setInfoShown(!infoShown)} value="info" >  
                    <InfoIcon />
                </ActionButton>
                <ActionButton className='actionbtn' style={{pointerEvents: 'initial', color:'red'}} access={access} onClick={onClick} value="like" >
                    <FavoriteIcon />
                </ActionButton>
            </CardActions>
        </Card>
    </motion.div>
    </ActionDiv>
    </motion.div>
    
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