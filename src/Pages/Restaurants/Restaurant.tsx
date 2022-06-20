import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export interface RestaurantData {
    id: number,
    name: string,
    description: string,
    address: string,
    products: number
}

interface Props {
    data: RestaurantData
}

const Restaurant = (props: Props) => {
    const navigate = useNavigate();

    const openRestaurant = () => navigate(`${props.data.id}`);

    return (
        <Grid item key={props.data.id} xs={12} sm={6} md={4}>
            <Card onClick={openRestaurant}
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.data.name}
                    </Typography>
                    <Typography>
                        {props.data.description}
                    </Typography>
                    <Typography>
                        {props.data.address}
                    </Typography>
                    <Typography>
                        Products: {props.data.products}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default Restaurant;