import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Collapse, Icon, ImageList, ImageListItem, List, ListItemButton, ListItemText, MobileStepper, Paper, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';


const Photos = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [photos, setPhotos] = useState(null)
    const [activeImage, setActiveImage] = useState(0)
    const [maxImage, setMaxImage] = useState()
    const navigate = useNavigate()
    const params = useParams()
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/albums/${params.albumId}/photos`)
            .then(res => res.json())
            .then(json => { setPhotos(json); setMaxImage(json.length); })
    }, [])


    const handleNext = () => {
        setActiveImage((activeImage) => activeImage + 1);
    };

    const handleBack = () => {
        setActiveImage((activeImage) => activeImage - 1);
    };



    return (
        <React.Fragment>
            {photos && <Box sx={{ maxWidth: 600, flexGrow: 1, margin: '75px 130px' }}>
                <Paper
                    square
                    elevation={0}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        height: 50,
                        pl: 2,
                    }}
                >
                    <Typography sx={{ fontSize: 15 }}>{photos[activeImage].title}</Typography>
                </Paper>
                <Box
                    component="img"
                    sx={{
                        height: 450,
                        display: 'block',
                        maxWidth: 600,
                        overflow: 'hidden',
                        width: '100%',
                    }}
                    src={photos[activeImage].thumbnailUrl}
                    alt={'picture'}
                />
                <MobileStepper
                    variant='progress'
                    steps={maxImage}
                    position="static"
                    activeStep={activeImage}
                    nextButton={
                        <Button size="small" onClick={handleNext} disabled={activeImage === maxImage- 1}>Next</Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleBack} disabled={activeImage === 0}> Back </Button>
                    }
                />
                <Button variant="contained" sx={{ margin: 3 }} onClick={() => navigate('/main/albums')}>Back to albums</Button>
            </Box>}
        </React.Fragment>
    );
}

export default Photos;