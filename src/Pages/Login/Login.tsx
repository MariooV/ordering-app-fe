import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';

import Axios from '../../Services/Axios';
import {User, UserContexData} from '../../Contex/UserContex';
require('./Login.scss');

const theme = createTheme();

const Login = () => {
    let navigate = useNavigate();
    const {user, setUser} = React.useContext(UserContexData);

    React.useEffect(() => {
        if (Object.entries(user).length !== 0) navigate('/dashboard');
    }, [])

    const [remember, setRemember] = React.useState<boolean>(false);
    const changeRemember = (e: React.ChangeEvent<HTMLInputElement>) => setRemember(Boolean(e.target.value));

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const data = { email: form.get('email'), password: form.get('password'), remember: remember};
        
        Axios.post('/login', data)
            .then(response => {
                Axios.get('/user')
                    .then(({data}) => {
                        setUser(data as User);
                        sessionStorage.setItem('User', JSON.stringify(data as User));
                        alert('Welcome ' + data.username);
                        navigate('/dashboard');
                    })
            })
            .catch(response => {
                alert(response.response.data.message);
            })
    };

    const facebookLogin = () => {
        Axios.post('/login', {email: 'admin@gmail.com', password: 'admin123'})
            .then(response => {
                Axios.get('/user')
                    .then(({ data }) => {
                        setUser(data as User);
                        sessionStorage.setItem('User', JSON.stringify(data as User));
                        alert('Welcome ' + data.username);
                        navigate('/dashboard');
                    })
            })
            .catch(response => {
                alert(response.response.data.message);
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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value={remember as boolean} color="primary" onChange={changeRemember} />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            className='fbButton'
                            onClick={facebookLogin}
                            startIcon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill='white' viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" /></svg>}
                        >
                            Facebook Login
                        </Button>
                        <Grid container>
                            <Link to="/register">
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Login;