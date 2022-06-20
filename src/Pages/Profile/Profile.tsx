import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Axios from '../../Services/Axios';
import { User, UserContexData } from '../../Contex/UserContex';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
require('./Profile.scss');

const Input = styled('input')({
    display: 'none',
});

const defaultImage = 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png';

const theme = createTheme();

const Profile = () => {
    const { user, setUser } = React.useContext(UserContexData);
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        form.append('user_id', user.id.toString());
        Axios.post(`/user/edit`, form, {
            headers: { 'Content-Type': 'multipart/form-data', },
        })
            .then(({data}) => {
                setUser({...user, image: data.image, first_name: data.first_name, last_name: data.last_name})
            })
            .catch(error => {
                console.log(error)
            })
    }

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
                        {user.username}
                    </Typography>

                    <img alt='Profile Image' src={!user.image ? defaultImage : `http://localhost/${user.image}`} className="profile_image" />

                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} encType='multipart/form-data' >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <label htmlFor="image">
                                    <Input accept="image/*" id="image" name='image' type="file" />
                                    <Button variant="contained" component="span">
                                        Profile Image
                                    </Button>
                                </label>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="first_name"
                                    required
                                    fullWidth
                                    id="first_name"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="last_name"
                                    label="Last Name"
                                    name="last_name"
                                    autoComplete="family-name"
                                />
                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Update
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default Profile;