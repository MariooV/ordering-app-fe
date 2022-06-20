import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {RestaurantData} from './Restaurant';
import Restaurant from './Restaurant';
import Axios from '../../Services/Axios';

import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Outlet } from 'react-router-dom';

export interface Pagination {
    current_page: number,
    last_page: number,
    from: number,
    per_page: number,
    total: number,
    to: number
}

const theme = createTheme();

const Restaurants = () => {
    const [restaurants, setRestaurants] = React.useState<RestaurantData[]>([] as RestaurantData[]);
    const [pagination, setPagination] = React.useState<Pagination>({} as Pagination);

    React.useEffect(() => {
        Axios.get(`/restoraunts`)
            .then(({data}) => {
                setRestaurants(Object.values(data.data) as RestaurantData[]);
                setPagination(data.meta as Pagination);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <main>
                <Container sx={{ py: 2 }} maxWidth="md">
                    <Grid container spacing={4}>
                        {
                            restaurants.map((res, index) => {
                                return <Restaurant key={index} data={res} />
                            })
                        }
                    </Grid>
                </Container>
                <Container style={{justifyContent: 'center', display: 'flex'}}>
                    <Pagination
                        count={pagination.last_page}
                        renderItem={(item) => (
                            <PaginationItem
                                components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                                {...item}
                            />
                        )}
                    />
                </Container>
                <Outlet />
            </main>
        </ThemeProvider>
    );
}

export default Restaurants;