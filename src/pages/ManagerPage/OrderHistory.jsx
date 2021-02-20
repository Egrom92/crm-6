import React from 'react'
import {NavLink, useHistory} from 'react-router-dom';

export default function OrderHistory(
    {fullNameViewedOrders}
) {
    
    const nameList = fullNameViewedOrders.map((order, i) => (
        <li className="nav-item" key={i}>
            <NavLink to={`/order/${order.id}`} className="nav-link" href="#">
                {order.fullName}
            </NavLink>
        </li>
    ))

    
    return (
        <nav className="col-md-2 d-none d-md-block bg-light sidebar" style={{height: '100vh'}}>
            <div className="sidebar-sticky">
                <h6
                    className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    Последние просматриваемые
                </h6>
                <ul className="nav flex-column mb-2">
                    {nameList}
                </ul>
            </div>
        </nav>
    )
}