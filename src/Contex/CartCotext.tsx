import { createContext } from "react";

export interface MyProduct {
    product_id: number,
    product_amount: number
}

export interface MyProductsContex {
    myProducts: MyProduct[]
    setMyProducts: (myProducts: MyProduct[]) => void,
}

export const ProductsContexData = createContext<MyProductsContex>({} as MyProductsContex);