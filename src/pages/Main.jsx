
import { Container, CssBaseline, Tab, Tabs } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';



const Main = () => {
    const [value, setValue] = useState(0);
    const navigate = useNavigate()

    const handleChange = (event, newValue) => {
        setValue(newValue);
        navigate(`${event.target.id}`)
    };
    useEffect(() => {   
        !JSON.parse(sessionStorage.getItem('user')) && setTimeout(() => {
            navigate('/login')
        }, 2000); 
    })

    return (
        <React.Fragment>
           
            <Container sx={{marginTop : '5%'}}>
                <Box sx={{ bgcolor: 'rgb(180, 237, 229, 0.506)', height: '85vh', width : '80vh',  overflow : 'scroll'}} >
            <Header />
            <Tabs value={value} onChange={handleChange} centered>
                <Tab label="info" id='info' />
                <Tab label="albums" id='albums' />
                <Tab label="posts" id='posts' />
                <Tab label="todos" id='todos' />
            </Tabs>
            <CssBaseline />
                    <Outlet />
                </Box>
            </Container>

        </React.Fragment>
    );
}

export default Main;