import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';

function MCard(props) {
    const [isFavorite, setIsFavorite] = useState(props.fav);
    const navigate = useNavigate();

    const toggleFavorite = async () => {
        const newFavStatus = isFavorite ? 0 : 1;
        setIsFavorite(!isFavorite); // Toggle locally

        try {
            const response = await axios.post(`http://localhost:3000/updateFavorite/${props.id}`, {
                fav: newFavStatus
            });
            console.log('Favorite status updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating favorite status:', error);
            setIsFavorite(!isFavorite); 
        }
    };

    const handleClick = () => {
        navigate({
            pathname: '/recipe',
            search: `?id=${props.id}`
        });
    };

    return (
        <div className='card'>
            <Card sx={{ maxWidth: 345, boxShadow: 7, borderRadius: 2, m: 1 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={props.image}
                    title={props.text}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.text}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Rating: {props.rating}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={handleClick} size="small" variant="outlined" sx={{ color: '#1976d2' }}>Show</Button>
                    <Button onClick={toggleFavorite} size="small" variant="outlined" sx={{ color: isFavorite ? '#f44336' : '#4caf50' }}>
                        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default MCard;
