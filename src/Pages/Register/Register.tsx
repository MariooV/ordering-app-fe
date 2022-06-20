import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Axios from "../../Services/Axios";
import { User, UserContexData } from "../../Contex/UserContex";

const theme = createTheme();

interface UserType {
  id: Number;
  name: string;
}

const USER_TYPES = [
  { id: 0, name: "Korisnik" } as UserType,
  { id: 1, name: "Dostavljac" } as UserType,
  { id: 2, name: "Administrator" } as UserType,
];

const Register = () => {
  let navigate = useNavigate();
  const { user, setUser } = React.useContext(UserContexData);

  React.useEffect(() => {
    if (Object.entries(user).length !== 0) navigate("/dashboard");
  }, []);

  const [date, setDate] = React.useState<Date | null>(new Date());
  const handleChange = (newValue: Date | null) => setDate(newValue);

  const [userType, setUserType] = React.useState<string>(
    USER_TYPES[0].name as string
  );
  const handleUserTypeChange = (event: SelectChangeEvent) =>
    setUserType(event.target.value);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const typeId = USER_TYPES.find((t) => t.name === userType)?.id;
    const userData = {
      first_name: form.get("first_name") as string,
      last_name: form.get("last_name") as string,
      username: form.get("username") as string,
      birthday: date?.toISOString().split("T")[0] as string,
      type: typeId as number,
      email: form.get("email") as string,
      password: form.get("password"),
      address: form.get("address") as string,
    };
    console.log(userData);
    Axios.post("/register", userData)
      .then((response) => {
        const newUser = {
          first_name: form.get("first_name") as string,
          last_name: form.get("last_name") as string,
          username: form.get("username") as string,
          birthday: date,
          type: typeId as number,
          email: form.get("email") as string,
          address: form.get("address") as string,
        } as User;
        navigate("/login");
      })
      .catch((resonse) => {
        alert("Error happen on while creating account! Please try again.");
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
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
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="confirm_password"
                  label="ConfirmPassword"
                  type="password"
                  id="confirm_password"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Birthday"
                    inputFormat="MM/dd/yyyy"
                    value={date}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue={USER_TYPES[0].name as string}
                  label="User Type"
                  onChange={handleUserTypeChange}
                  style={{ width: "100%" }}
                >
                  {USER_TYPES.map((type) => {
                    return (
                      <MenuItem
                        value={type.name as string}
                        key={type.id as number}
                      >
                        {type.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="address"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;
