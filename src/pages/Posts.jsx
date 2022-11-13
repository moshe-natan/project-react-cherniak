import { Box, Button, Card, CardContent, Collapse, Icon, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ChatIcon from '@mui/icons-material/Chat';
import ClearIcon from '@mui/icons-material/Clear';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Posts = (props) => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [posts, setPosts] = useState(props.data.posts ? props.data.posts.filter(e => e.userId == user.id)
        .map((e, i) => { e.open = false; return e }) : null);
    const navigate = useNavigate()
    useEffect(() => {
        if (!posts) {
            fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`)
                .then(res => res.json())
                .then(data => setPosts(data.map((e, i) => { e.open = false; return e })))
        }
    }, [])

    const handleOpenClick = (idx) => {
        const posts1 = JSON.parse(JSON.stringify(posts))
        posts1[idx].open = !posts1[idx].open
        setPosts(posts1)
    };

    const handleCommendtsClick = (idx) => {
        navigate(`${idx + 1}`)
    }

    return (
        <React.Fragment>
            <List
                sx={{ width: '100%', maxWidth: 650, bgcolor: 'background.paper', margin: 10 }}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                {posts && posts.map((e, i) =>
                    <React.Fragment key={i}>
                        <ListItemButton onClick={() => handleOpenClick(i)}>
                            <ListItemText primary={`post number ${i + 1}`} />
                            {e.open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </ListItemButton>
                        <Collapse in={e.open} timeout="auto" unmountOnExit>
                            <Box sx={{ backgroundColor: 'rgba(255, 234, 176, 0.705)', minHeight: 180, paddingTop: 3 }}>
                                <Card sx={{ minWidth: 10, minHeight: 130, marginLeft: 3, marginRight: 3 }}>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 19 }} > {e.title}</Typography>
                                        <Button onClick={() => handleCommendtsClick(i)} variant="outlined">Read post</Button>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Collapse>
                    </React.Fragment>
                )}
            </List>

        </React.Fragment >
    );
}

export default Posts;