import { useContext, useEffect } from "react";
import { User, UserContexData } from "../../Contex/UserContex";
import { useNavigate, Outlet } from "react-router-dom";
import Axios from "../../Services/Axios";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { ProductsContexData } from "../../Contex/CartCotext";
import { Button, Grid } from "@mui/material";

const drawerWidth = 240;
const Dashboard = () => {
  const { user, setUser } = useContext(UserContexData);
  const { myProducts } = useContext(ProductsContexData);
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.entries(user).length === 0) navigate("/login");
  }, []);

  const navigateTo = (path: string) => {
    if (path.toLocaleLowerCase() === "profile") return navigate("/dashboard");
    if (path.toLocaleLowerCase() === "logout") return logOut();
    navigate(path.toLowerCase().replace(" ", ""));
  };

  const logOut = () => {
    Axios.post("logout")
      .then((response) => {
        setUser({} as User);
        sessionStorage.clear();
        navigate("/login");
      })
      .catch((response) => {
        setUser({} as User);
        sessionStorage.clear();
        navigate("/login");
      });
  };

  const openCart = () => {
    navigate("cart");
  };

  const getTotalProducts = () => {
    let amount = 0;
    myProducts.forEach((product) => (amount += product.product_amount));
    return amount;
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Grid container spacing={2}>
            <Grid item xs={8} md={10}>
              <Typography variant="h6" noWrap component="div">
                Dashboard
              </Typography>
            </Grid>
            {user.type === 0 && (
              <Grid item xs={4} md={2}>
                <Button variant="contained" onClick={() => openCart()}>
                  My Cart ({getTotalProducts()})
                </Button>
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {[
            "Profile",
            "Restaurant",
            user.type !== 1 ? "My Orders" : "",
            user.type !== 1 ? "Order History" : "",
          ].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemText primary={text} onClick={() => navigateTo(text)} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {[
            user.type === 1 ? "Admin Panel" : "",
            user.type === 1 ? "All Orders" : "",
            "Logout",
          ].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemText primary={text} onClick={() => navigateTo(text)} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;
