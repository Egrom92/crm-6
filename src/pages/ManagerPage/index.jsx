import React, {useState, useEffect, useCallback} from "react";
import OrderFilter from "./OrderFilter";
import OrderHistory from "./OrderHistory";
import Orders from "./Orders";
import {NavLink, useHistory} from "react-router-dom";
import hc from "../../hc";
import Pagination from "./Pagination";
import {statuses} from "../../data";

import useOnce from "../../hooks/useOnce";
import useQuery from "../../hooks/useQuery";

export default function Table(props) {
    const history = useHistory();
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [orderHistory, setOrderHistory] = useState([]);
    const [ordersCount, setOrdersCount] = useState(null);
    const [fullNameViewedOrders, setFullNameViewedOrders] = useState([]);

    const query = useQuery();
    const ordersLimit = hc.defaultParams.query._limit

    useEffect(() => {
        hc.get("/orders", query).then((orders) => setOrders(orders));
    }, [query]);

    useOnce(() =>
        hc
            .get("/products", {_limit: 1000})
            .then((products) => setProducts(products))
    );

    useOnce(() =>
        hc
            .get("/messages", {_limit: 1000})
            .then((lastViewedOrders) => setOrderHistory(lastViewedOrders))
    );

    useOnce(() => hc.getAndCount("/orders").then((obj) => setOrdersCount(obj.count)));

    useEffect(() => {
        let viewedOrders = []
        orderHistory.forEach(historyOrder => {
            orders.forEach(order => {
                if (order.id === historyOrder.order) {
                    viewedOrders.push({
                        id: order.id,
                        fullName: order.fullname
                    })
                }
            })
        })

        setFullNameViewedOrders(viewedOrders.reverse().splice(0, 4))
    }, [orderHistory])


    const filtersChangeHandler = useCallback(
        ({fullname, status, productId, createdAt, activePage}) => {
            let search = [];

            if (fullname) {
                search.push(`fullname=${fullname}`);
            }

            if (status) {
                search.push(`status=${status}`);
            }

            if (productId) {
                search.push(`productId=${productId}`);
            }

            if (createdAt) {
                search.push(`createdAt=${createdAt}`);
            }

            if (activePage) {
                search.push(`_page=${activePage}&_limit=${ordersLimit}`);
            }

            history.push({search: search.join("&")});
        },
        [history]
    );


    return (
        <div className="container-fluid">
            <div className="row">

                <OrderHistory fullNameViewedOrders={fullNameViewedOrders}/>

                <main
                    role="main"
                    className="col-md-9 ml-sm-auto col-lg-10 px-4 d-flex flex-column"
                >
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2">Заказы</h1>
                        <NavLink to="/new" className="btn btn-outline-success">
                            Добавить заказ
                        </NavLink>
                    </div>

                    <OrderFilter
                        products={products}
                        statuses={statuses}
                        query={query}
                        onFiltersChange={filtersChangeHandler}
                    />

                    <Orders orders={orders} products={products}/>

                    <Pagination
                        query={query}
                        onPageChange={filtersChangeHandler}
                        count={ordersCount}
                        limit={ordersLimit}
                    />
                </main>
            </div>
        </div>
    );
}
