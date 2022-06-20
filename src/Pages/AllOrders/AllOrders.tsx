import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Axios from '../../Services/Axios';
import { Order } from '../Orders/Orders';

const AllOrders = () => {
    const [orders, setOrders] = useState<Order[]>([] as Order[]);

    useEffect(() => {
        Axios.get('/orders/all')
            .then(({ data }) => {
                setOrders(data.data as Order[]);
            })
            .catch(response => {
                console.log(response)
                setOrders([] as Order[]);
            })
    }, []);

    return Object.values(orders).length > 0 ? (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="Admin Panel">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell align="right">Restourant</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Product Amount</TableCell>
                        <TableCell align="right">Delivered</TableCell>
                        <TableCell align="right">In Progress</TableCell>
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
                            <TableCell align="right">{order.restaurant_name}</TableCell>
                            <TableCell align="right">{order.price}</TableCell>
                            <TableCell align="right">{order.products.length}</TableCell>
                            <TableCell align="right">{order.delivered === true ? 'Delivered' : 'Not Yet'}</TableCell>
                            <TableCell align="right">{order.is_being_delivered === true ? 'No' : 'Yes'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    ) : <>There is no orders in database</>
}

export default AllOrders;