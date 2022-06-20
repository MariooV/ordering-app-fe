import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";

import { useContext, useState } from "react";
import { MyProduct, ProductsContexData } from "../../Contex/CartCotext";
import Axios from "../../Services/Axios";
import { Order } from "../Orders/Orders";

const theme = createTheme();

const Checkout = () => {
  const { myProducts, setMyProducts } = useContext(ProductsContexData);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const data = {
      delivery_address: form.get("delivery_address") as string,
      comment: form.get("comment") as string,
      ordered_products: JSON.stringify(myProducts),
    };

    Axios.post("/orders", data)
      .then(({ data }) => {
        setMyProducts([] as MyProduct[]);
        navigate("/dashboard/myorders");
      })
      .catch((response) => {
        alert("You already have active order.");
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
          <Typography component="h1" variant="h5">
            Checkout
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="delivery_address"
              label="Delivery Address"
              name="delivery_address"
              autoComplete="delivery_address"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="comment"
              label="Comment"
              type="text"
              id="comment"
              autoComplete="comment"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Checkout
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Checkout;
