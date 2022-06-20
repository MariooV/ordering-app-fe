import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Axios from '../../../Services/Axios';

const theme = createTheme();

interface Props {
    restorant_id: number,
    refech: () => void
}

const CreateProduct = (props: Props) => {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        
        const data = {
            name: form.get('name'),
            ingrediants: form.get('ingrediants'),
            price: form.get('price'),
            restorant_id: props.restorant_id
        };

        Axios.post('/products', data)
            .then(({data}) => {
                alert(`Product ${data.name} successfully created!`);
                props.refech();
            })
            .catch(response => {
                console.log(response);
            })
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Create New Product
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="name"
                            name="name"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="ingrediants"
                            label="ingrediants"
                            id="ingrediants"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="number"
                            name="price"
                            label="Price"
                            id="pruce"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Create Product
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default CreateProduct;