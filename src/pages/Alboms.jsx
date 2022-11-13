import { Box, Button, Card, CardContent, Collapse, Icon, List, ListItemButton, ListItemText, MobileStepper, Paper, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ClearIcon from '@mui/icons-material/Clear';
import { Outlet, useNavigate } from 'react-router-dom';

const Alboms = (props) => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [albums, setAlbums] = useState(props.data.albums && user ? props.data.albums.filter(e => e.userId == user.id)
        .map((e, i) => { e.open = false; return e }) : null);

    const navigate = useNavigate()

    useEffect(() => {
        if (!albums) {
            fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/albums`)
                .then(res => res.json())
                .then(data => setAlbums(data.map((e, i) => { e.open = false; return e })))
        }
    }, [])


    const handleOpenClick = (idx) => {
        const albums1 = JSON.parse(JSON.stringify(albums))
        albums1[idx].open = !albums1[idx].open
        setAlbums(albums1)
    };

    const handlePhotosClick = (idx) => {
        navigate(`${idx + 1}/photos`)
    }




    return (
        <React.Fragment>
            <List
                sx={{ width: '100%', maxWidth: 650, bgcolor: 'background.paper', margin: 10 }}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                {albums && albums.map((e, i) =>
                    <React.Fragment key={i}>
                        <ListItemButton onClick={() => handleOpenClick(i)}>
                            <ListItemText primary={`album number ${i + 1}`} />
                            {e.open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </ListItemButton>
                        <Collapse in={e.open} timeout="auto" unmountOnExit>
                            <Box sx={{ backgroundColor: 'rgba(255, 234, 176, 0.705)', minHeight: 170, paddingTop: 3, paddingBottom: 3 }}>
                                <Card sx={{ minWidth: 10, minHeight: 120, marginLeft: 2, marginRight: 2 }}>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 19 }} > {e.title}</Typography>
                                        <Button variant="outlined" onClick={() => handlePhotosClick(i)}>Photos</Button>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Collapse>
                    </React.Fragment>
                )}
            </List>
            <Outlet />
        </React.Fragment >
    );
}

export default Alboms;