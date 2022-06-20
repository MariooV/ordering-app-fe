import { useState, useEffect, useContext } from "react";
import { Product } from "../Restaurants/Product/Product";
import Axios from "../../Services/Axios";
import { UserContexData, USER_TYPES } from "../../Contex/UserContex";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export interface Order {
    id: number,
    restaurant_name: string,
    restaurant_id: number,
    products: Product[],
    price: number,
    is_being_delivered: boolean,
    delivered: boolean
}

const Orders = () => {

    const { user, setUser } = useContext(UserContexData);
    const [orders, setOrders] = useState<Order[]>({} as Order[]);

    useEffect(() => {
        Axios.get(`/orders/0`)
            .then(({data}) => {
                setOrders(data.data as Order[]);
            })
            .catch(response => {
                setOrders([] as Order[]);
            })
    }, []);

    const calcPrice = (products: Product[]) => {
        let price = 0;
        products.forEach(product => price += product.price);
        return price.toFixed(2);
    }

    const approveOrder = (order: Order) => {
        Axios.post('/orders/approve', {order_id: order.id})
            .then(({data}) => {
                if(data) return alert('Order Accepted');
                alert('Another driver already accepted this order!');
            })
            .catch(response => {
                alert('Another driver already accepted this order!');
            })
    }

    return Object.values(orders).length !== 0 ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            {
                orders.map(order => {
                    return <Card key={order.id}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Active Order
                            </Typography>
                            <Typography variant="h5" component="div">
                                Restourant: {order.restaurant_name}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Price: {calcPrice(order.products)}
                            </Typography>
                            <Typography variant="body2">
                                {
                                    order.products.map(prod => {
                                        return <p key={prod.id}>{prod.name}</p>
                                    })
                                }
                            </Typography>
                        </CardContent>
                        <CardActions>
                            {
                                user.type === 2 ?
                                    <Button size="small" onClick={() => approveOrder(order)}>Available Order [Accept]</Button> :
                                    <Button size="small">
                                        {
                                            Boolean(order.is_being_delivered) === true ? 'Order Is Accepted By Driver'
                                            : 'Waiting for Driver To Accept'
                                        }
                                    </Button>
                            }
                        </CardActions>
                    </Card>
                })
            }
        </div>
    ) : <h1>You dont have any active orders</h1>
}

export default Orders;