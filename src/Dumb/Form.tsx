import { FC } from 'react'
import FormControl from '@mui/material/FormControl';
import {  Button, FormControlLabel, FormLabel,  Radio, RadioGroup, TextField } from '@mui/material';
import './Form.scss'

interface form{
    onSubmit: (value: any) => void;
    onChange: (value: any) => void;
    username:string;
    userdescription:string;
    userage:number;
    usergender:string;
}
const Form:FC<form> = ({onSubmit, onChange, username, userdescription, userage, usergender}) => {
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
                <FormControlLabel  value="female" control={<Radio value='female' id='gender' onChange={onChange}/>} label="Женский член" />
                <FormControlLabel  value="male" control={<Radio value='male' id='gender' onChange={onChange}/>} label="Мужской член" />
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
        <Button type='submit' variant='outlined' color='primary'>Сохранить</Button>
    </form>
  )
}

export default Form