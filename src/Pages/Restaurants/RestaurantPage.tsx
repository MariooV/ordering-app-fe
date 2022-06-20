import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RestaurantData } from "./Restaurant";
import Axios from "../../Services/Axios";
import ProductTable from "./Product/ProductTable";
import { Product } from "./Product/Product";
import CreateProduct from "./Product/CreateProduct";
import { UserContexData } from "../../Contex/UserContex";

const RestaurantPage = () => {

    const [restaurant, setRestaurant] = useState<RestaurantData>({} as RestaurantData);
    const [products, setProducts] = useState<Product[]>({} as Product[]);
    const { user, setUser } = useContext(UserContexData);
    const { id } = useParams();

    const fetchData = () => {
        Axios.get(`/restoraunts/${id}`)
            .then(({ data }) => {
                setRestaurant(data?.data as RestaurantData);
                setProducts(data?.data?.product_list as Product[]);
            })
            .catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        fetchData();
    }, []);

    return restaurant ? (
        <div>
            <header>
                <h1>{restaurant.name}</h1>
                <p>{restaurant.description}</p>
                <small>{restaurant.address}</small>
                <small>Total Products: {restaurant.products}</small>
            </header>
            <main>
                <ProductTable products={products} />
                {
                    user.type === 1 ? <CreateProduct restorant_id={restaurant.id} refech={fetchData} /> : <></>
                }
            </main>
        </div>
    ) : <></>
}

export default RestaurantPage;