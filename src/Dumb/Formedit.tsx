import { FC } from 'react'
import {  Button,  IconButton, TextField, Typography } from '@mui/material';
import './Form.scss'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

interface form{
    onSubmit?: (value: any) => void;
    onChange?: (value: any) => void;
    username?:string;
    userdescription?:string;
    userage?:number;
    usergender?:string;
    uploadFile?:(value: any) => void;
    avatar?:string;
}
const FormEdit:FC<form> = ({onSubmit, onChange, username, userdescription, userage, uploadFile}) => {
  return (
    <form onSubmit={onSubmit}>
        <TextField label='Как вас зовут?' variant='outlined' id="name" defaultValue={username} onChange={onChange}/>
        <TextField
            id="age"
            label='Сколько вам лет?'
            type="number"
            InputLabelProps={{
                shrink: true,
            }}
            variant="outlined" 
            defaultValue={userage}
            onChange={onChange}
        />
        <TextField
          id="description"
          label="Расскажите о себе"
          multiline
          rows={4}
          onChange={onChange}
          defaultValue={userdescription}
          InputLabelProps={{
            shrink: true,
        }}
        />
        <IconButton color="primary" aria-label="upload picture" component="label" className='upload'>
            <input id='fileupload' hidden accept="image/*" type="file" onChange={uploadFile}/>

            <Typography className='uploadtext' variant='h5'>Загрузить фотографию</Typography> <AddAPhotoIcon className='photoicon'/>
        </IconButton>
        <Button type='submit' variant='outlined' color='primary'>Сохранить</Button>
    </form>
  )
}

export default FormEdit