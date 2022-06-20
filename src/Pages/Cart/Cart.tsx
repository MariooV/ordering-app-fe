import { useState, useEffect, useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { MyProduct, ProductsContexData } from '../../Contex/CartCotext';
import { Product } from '../Restaurants/Product/Product';
import Axios from '../../Services/Axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { myProducts, setMyProducts } = useContext(ProductsContexData);
    const [productNames, setProductNames] = useState<string[]>([] as string[]);
    const navigate = useNavigate();

    useEffect(() => {
        Axios.post('/products/getNames', { product_ids: JSON.stringify(myProducts.map(prod => prod.product_id))})
            .then(({data}) => {
                setProductNames(data);
            })
            .catch(response => {
                console.log(response);
            })
    }, []);

    const removeProduct = (product: MyProduct) => {
        let oldProducts = [...myProducts];
        oldProducts.splice(oldProducts.indexOf(product), 1);
        setMyProducts(oldProducts);
    }

    const goToCheckout = () => navigate('/dashboard/checkout');

    return Object.values(myProducts).length > 0 && productNames?.length > 0 ? (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="Admin Panel">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell align="right">Remove</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {myProducts?.map((product, index) => (
                            <TableRow
                                key={product.product_id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="right">{productNames[index]}</TableCell>
                                <TableCell align="right">{product.product_amount}</TableCell>
                                <TableCell align="right">
                                    <Button variant="contained" onClick={() => removeProduct(product)}>
                                        Remove
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" onClick={() => goToCheckout()} style={{marginTop: '1rem'}}>
                Checkout
            </Button>
        </>
    ) : <>Your cart is empty...</>
}

export default Cart;