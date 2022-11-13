import { Button, Card, CardContent, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ChatIcon from '@mui/icons-material/Chat';

const Comments = () => {
    const [comments, setComments] = useState()
    const params = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        if (!comments) {
            fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}/comments`)
                .then(res => res.json())
                .then(json => setComments(json))
        }
    }, [])
    return (
        <React.Fragment>
            <Card sx={{ minWidth: 10, minHeight: 160, marginLeft: 2, marginRight: 2 }}>
                <CardContent sx={{ backgroundColor: 'rgb(208, 246, 208)' }}>
                    {comments && comments.map((e, i) =>
                        <React.Fragment><ChatIcon sx={{ margin: 1 }} /><Typography key={i} sx={{ fontSize: 12 }} >{e.body}</Typography></React.Fragment>
                    )}
                </CardContent>
                <Button variant="contained" sx={{ margin: 2 }} onClick={() => navigate(-1)}>Back to the post</Button>
            </Card>
        </React.Fragment>
    );
}

export default Comments;