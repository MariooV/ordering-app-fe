import { useContext, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ProductRow, { Product } from './Product';
import { MyProduct, ProductsContexData } from '../../../Contex/CartCotext';

interface Props {
    products: Product[]
}

const ProductTable = (props: Props) => {

    const {myProducts, setMyProducts} = useContext(ProductsContexData);

    const addToCart = (product: Product) => {
        let oldCartProducts = [...myProducts];
        let existingProduct = oldCartProducts.find(prod => prod.product_id === product.id);
        if(existingProduct) {
            existingProduct.product_amount++
        } else {
            const newMyProduct = {product_amount: 1, product_id: product.id} as MyProduct;
            oldCartProducts.push(newMyProduct);
        }
        setMyProducts(oldCartProducts as MyProduct[]);

        console.table(myProducts);
    }

    return props?.products ? (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="Product Table">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell align="right">Product Name</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Ingrediants</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        props.products.length > 0 ? props.products?.map((prod, index) => {
                            return <ProductRow product={prod} index={index} key={index} addToCart={addToCart} />
                        }) : <></>
                    }
                </TableBody>
            </Table>
        </TableContainer>
    ) : <></>
}

export default ProductTable;