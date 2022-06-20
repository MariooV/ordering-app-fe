import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import Dashboard from './Pages/Dashboard/Dashboard';

import { User, UserContexData } from './Contex/UserContex'; 
import Profile from './Pages/Profile/Profile';
import Landing from './Pages/Landing/Landing';
import Orders from './Pages/Orders/Orders';
import OrderHistory from './Pages/OrderHistory/OrderHistory';
import Restaurants from './Pages/Restaurants/Restaurants';
import AdminPanel from './Pages/AdminPanel/AdminPanel';
import RestaurantPage from './Pages/Restaurants/RestaurantPage';
import { MyProduct, ProductsContexData } from './Contex/CartCotext';
import Cart from './Pages/Cart/Cart';
import Checkout from './Pages/Checkout/Checkout';
import AllOrders from './Pages/AllOrders/AllOrders';

const App = () => {

	const [user, setUser] = useState<User>({} as User);
	const [myProducts, setMyProucts] = useState<MyProduct[]>([] as MyProduct[]);

	useEffect(() => {
		if(sessionStorage.getItem('User')) {
			setUser(JSON.parse(sessionStorage.getItem('User') as string) as User)
		}
	}, []);

	return (
		<UserContexData.Provider value={{ user: user, setUser: setUser }}>
			<ProductsContexData.Provider value={{ myProducts: myProducts, setMyProducts: setMyProucts }}>
				<Routes>
					<Route path='/' element={<Landing />} />
					<Route path='/dashboard' element={<Dashboard/>}>
						<Route index={true} element={<Profile />} />
						<Route path='myorders' element={<Orders />} />
						<Route path='orderhistory' element={<OrderHistory />} />
						<Route path='restaurant' element={<Restaurants />}>
							<Route path=':id' element={<RestaurantPage />} />
						</Route>
						{
							user.type === 1 ? <Route path='adminpanel' element={<AdminPanel />} />
							: <></>
						}
						{
							user.type === 1 ? <Route path='allorders' element={<AllOrders />} />
							: <></>
						}
						<Route path='cart' element={<Cart />} />
						<Route path='checkout' element={<Checkout />} />
					</Route>
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route
						path="*"
						element={
							<main style={{ padding: "1rem" }}>
								<p>There's nothing here!</p>
							</main>
						}
					/>
				</Routes>
			</ProductsContexData.Provider>
		</UserContexData.Provider>
	);
}

export default App;