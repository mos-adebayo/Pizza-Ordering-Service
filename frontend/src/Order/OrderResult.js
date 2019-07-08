import React from 'react';
import PropTypes from 'prop-types';
import { Table, Badge } from "react-bootstrap";
import { appHelpers } from "../util/helper"
import Pagination  from "../util/pagination";

const OrderResult = ({ orders, activePage, pageLimit, totalOrders, handlePageClick }) => {
   const pageIndex = pageLimit * (activePage - 1);
    return (
        <>
            <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Pizza Type </th>
                <th>Pizza Size</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Address</th>
                <th>Date Ordered</th>
            </tr>
            </thead>
            <tbody>
            {
                orders.map((order, index) => <tr key={index}>
                    <td>{ (pageIndex) + (index + 1) }</td>
                    <td className={'text-capitalize'}>{`${order.customerName}`}</td>
                    <td>{`${order.pizzaType.name}`}</td>
                    <td>{`${order.pizzaSize.name}`}</td>
                    <td>{`${order.quantity}`}</td>
                    <td>
                        {
                            (order.status.name === "Pending") ? (
                                <Badge variant="warning">Pending</Badge>
                            ): (
                                <Badge variant="primary">{order.status.name}</Badge>
                            )
                        }
                    </td>
                    <td>{`${order.address}`}</td>
                    <td>{`${appHelpers.formatDate(order.createdAt)}`}</td>
                </tr>)
            }
            </tbody>
        </Table>
            
            <Pagination 
            activePage={activePage}
            totalItems={totalOrders} 
            handlePageClick={handlePageClick}
            pageLimit={pageLimit}
        />
        </>
    );
};

OrderResult.propTypes = {
    orders: PropTypes.array.isRequired
};

export default OrderResult;