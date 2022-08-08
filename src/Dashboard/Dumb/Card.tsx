import React, { FC } from 'react'
import Card from '@mui/material/Card';
import './Card.scss'
import { CardActions, CardContent, CardMedia,  Fab, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import InfoIcon from '@mui/icons-material/Info';

interface userprops{
    [key: string]: any;
}
export interface actionsection extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
{
    access:string
}
const Datecard:FC<userprops> = ({user, onClick, access}) => {
  return (
    <ActionSection onClick={onClick} access={access}>
    <Card  className='card'>
        <CardMedia component='img' className='cardimg' src={user?.avatar}/>
        <CardContent className='content'>
            <Typography variant='h4'>
                {user?.username}, {user?.userage}
            </Typography>
        </CardContent>
        <CardActions className='actions'>
            <Fab onClick={onClick} aria-label="dislike"  >
                <HeartBrokenIcon />
            </Fab>
            <Fab onClick={onClick} aria-label="info" >  
                <InfoIcon />
            </Fab>
            <Fab onClick={onClick} aria-label="like" >
                <FavoriteIcon />
            </Fab>
        </CardActions>
    </Card>
    </ActionSection>
  )
}
const ActionSection:FC<actionsection> = ({...rest}) =>{
    return(
        <section {...rest}/>
    )
}
export default Datecard