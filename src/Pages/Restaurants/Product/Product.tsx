import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';

export interface Product {
    id: number,
    name: string,
    price: number,
    created_at: string,
    updated_at: string,
    ingrediants: string,
    restorant_id: number
}

interface Props {
    product: Product,
    index: number,
    addToCart: (product: Product) => void
}

const ProductRow = (props: Props) => {
    return (
        <TableRow
            key={props.product.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {props.index}
            </TableCell>
            <TableCell align="right">{props.product.name}</TableCell>
            <TableCell align="right">{props.product.price}</TableCell>
            <TableCell align="right">{props.product.ingrediants}</TableCell>
            <TableCell align="right">
                <Button variant="contained" onClick={() => props.addToCart(props.product)}>
                    Add To Cart
                </Button>
            </TableCell>
        </TableRow>
    )
}

export default ProductRow;