import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Axios from '../../Services/Axios';
import { User, USER_TYPES } from '../../Contex/UserContex';
import Button from '@mui/material/Button';
import { Order } from '../Orders/Orders';
import { Product } from '../Restaurants/Product/Product';

const OrderHistory = () => {
    const [orders, setOrders] = useState<Order[]>([] as Order[]);

    useEffect(() => {
        Axios.get('/orders/user/history')
            .then(({ data }) => {
                setOrders(data.data as Order[]);
            })
            .catch(response => {
                console.log(response)
                setOrders([] as Order[]);
            })
    }, []);

    const calcPrice = (products: Product[]) => {
        let price = 0;
        products.forEach(product => price += product.price);
        return price;
    }

    return Object.values(orders).length > 0 ? (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="Order History">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Restaurant</TableCell>
                        <TableCell align="right">Products Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders?.map((order, index) => (
                        <TableRow
                            key={order.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {index}
                            </TableCell>
                            <TableCell align="right">{calcPrice(order.products)}</TableCell>
                            <TableCell align="right">{order.restaurant_name}</TableCell>
                            <TableCell align="right">{
                                order.products.map((order, index) => {
                                    return <p key={index}>{order.name}</p>
                                })
                            }</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    ) : <>Order history is empty</>
}

export default OrderHistory;