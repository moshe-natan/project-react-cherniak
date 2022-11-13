import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [user, setUser] = useState()
    const navigate = useNavigate()
    useEffect(() => {
        setUser(JSON.parse(sessionStorage.getItem('user')))
    }, [])

    const hendleLogOut = () => {
        sessionStorage.removeItem('user');
        navigate('/login')
    }

    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        {user && <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                           Wellcome {user.name}
                        </Typography>}
                        {user && <Button color="inherit" onClick={hendleLogOut}>logOut</Button>}
                    </Toolbar>
                </AppBar>
            </Box>
        </React.Fragment>
    );
}

export default Header;