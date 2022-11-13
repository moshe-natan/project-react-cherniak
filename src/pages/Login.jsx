
import { TextField, Button, Box, Card } from '@mui/material';
import { display, margin } from '@mui/system';
import React, {useState } from 'react';
import {  useNavigate } from 'react-router-dom';
const Login = (props) => {
    const [user, setUser] = useState({})
    


    const navigate = useNavigate()

    const setInputValue = (e, name) => {
        user[name] = e.target.value;
        setUser(user)
    }

    const chackUser = () => {
        const filtering = props.data['users'].filter((e, i) => (e.username == user['name']) && (e.address.geo.lat.includes(user['pass'])))
        if (filtering.length > 0) {
            sessionStorage.setItem('user', JSON.stringify(filtering[0]))
            navigate('/main/info    ')
        } else {
            navigate('/login')
        }
    }

    return (
        <React.Fragment>
           <Card variant='outlined' sx={{ maxWidth: 200, minHeight: 160, margin : '250px auto' ,padding : 10}}> 
                    <TextField id="outlined-basic" label="user name" variant="outlined" margin='normal' onChange={(e) => setInputValue(e, 'name')} /><br />
                    <TextField id="outlined-basic" label="password" variant="outlined" margin='normal' onChange={(e) => setInputValue(e, 'pass')}/><br />
                    <Button variant="contained" sx={{ marginLeft: '30px' }} onClick={chackUser}>Contained</Button><br />
            
        </Card>
        </React.Fragment>
    );
}

export default Login;