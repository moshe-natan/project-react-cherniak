import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

const SinglePost = () => {
    const [post, setPost] = useState()
    const params = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        if (!post) {
            fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`)
                .then(res => res.json())
                .then(json => setPost(json))
        }
    }, [])

    const handleCommendtsClick = () => {
        navigate(`comments`)
    }

    return (
        <React.Fragment>
            {post && <Box sx={{ backgroundColor: 'rgba(255, 234, 176, 0.705)', minHeight: 210, paddingTop: 3 }}>
                <Card sx={{ minWidth: 10, minHeight: 150, marginLeft: 3, marginRight: 3 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 19 }} > {post.title}</Typography>
                        <Typography sx={{ fontSize: 13 }} > {post.body}</Typography>
                        <Button onClick={() => handleCommendtsClick()} variant="outlined">commends</Button>
                        <Button variant="contained" sx={{ margin: 1 }} onClick={() => navigate(-1)}>Back to the posts</Button>
                    </CardContent>
                    <Outlet />
                </Card>

            </Box>}

        </React.Fragment>
    );
}

export default SinglePost;