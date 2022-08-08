import { FC } from 'react'
import FormControl from '@mui/material/FormControl';
import {  Button, FormControlLabel, FormLabel,  IconButton,  Radio, RadioGroup, TextField, Typography } from '@mui/material';
import './Form.scss'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

interface form{
    onSubmit: (value: any) => void;
    onChange: (value: any) => void;
    username:string;
    userdescription:string;
    userage:number;
    usergender:string;
    uploadFile:(value: any) => void;
}
const Form:FC<form> = ({onSubmit, onChange, username, userdescription, userage, uploadFile}) => {
  return (
    <form onSubmit={onSubmit}>
        <TextField label='Как вас зовут?' variant='outlined' id="name" value={username} onChange={onChange}/>
        <TextField
            id="age"
            label='Сколько вам лет?'
            type="number"
            InputLabelProps={{
                shrink: true,
            }}
            variant="outlined" 
            value={userage}
            onChange={onChange}
        />
        <FormControl className='gender'>
            <FormLabel id="genderlabel">Пол</FormLabel>
            <RadioGroup
                row
                aria-labelledby="genderlabel"
                name="row-radio-buttons-group"
            >
                <FormControlLabel  value="female" control={<Radio value='female' id='gender' onChange={onChange}/>} label="Женский" />
                <FormControlLabel  value="male" control={<Radio value='male' id='gender' onChange={onChange}/>} label="Мужской" />
            </RadioGroup>
        </FormControl>
        <TextField
          id="description"
          label="Расскажите о себе"
          multiline
          rows={4}
          onChange={onChange}
          value={userdescription}
        />
        <IconButton color="primary" aria-label="upload picture" component="label" className='upload'>
            <input id='fileupload' hidden accept="image/*" type="file" onChange={uploadFile}/>

            <Typography className='uploadtext' variant='h5'>Загрузить фотографию</Typography> <AddAPhotoIcon className='photoicon'/>
        </IconButton>
        <Button type='submit' variant='outlined' color='primary'>Сохранить</Button>
    </form>
  )
}

export default Form