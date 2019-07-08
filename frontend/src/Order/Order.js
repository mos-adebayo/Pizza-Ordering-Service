import React, { useEffect, useState } from 'react';
import logo from "../logo.svg";
import SearchForm from "./SearchForm";
import OrderList from "./OrderResult";
import { Alert } from "react-bootstrap";
import { getPizzaSizes, searchOrders, createOrder, getPizzaTypes } from "../util/common.service"
import {appConstants} from "../util/constant";

const pageLimit = 5;
let searchParams = { limit: pageLimit, page: 1 };

const Order = () => {
    const [errorMessage, setErrorMessage] = useState(false);
    const [requesting, setRequesting] = useState(false);

    const [pizzaSizes, setPizzaSizes] = useState([]);
    const [pizzaTypes, setPizzaTypes] = useState([]);
    const [orders, setOrders] = useState([]);

    // Pagination
    const [totalOrders, setTotalOrders] = useState(0);
    const [activePage, setActivePage] = useState(1);

    const setResponse = (response, callback) => {
        if(response.status === appConstants.REQUEST_SUCCESS){
            callback(response.response.data)
        }else {
            setErrorMessage(response.error.error)
        }
    };
    const setOrdersResponse = (response) => {
        if(response.status === appConstants.REQUEST_SUCCESS){
            setTotalOrders(response.response.data.totalRecords);
            setOrders(response.response.data.rows)
        }else {
            setErrorMessage(response.error.error)
        }
    };
    
    useEffect( () => {
        setRequesting(true);
        Promise.all([getPizzaSizes(), getPizzaTypes(), searchOrders(searchParams)])
            .then(([pizzaSizesResponse, pizzaTypesResponse, ordersResponse]) => {
                setResponse(pizzaSizesResponse, setPizzaSizes);
                setResponse(pizzaTypesResponse, setPizzaTypes);
                setOrdersResponse(ordersResponse);
                        setRequesting(false);
            }).catch(err => {
               setErrorMessage("Ensure to start the API service");
               setRequesting(false);
        })
    }, []);
    
    const fetchPageOrders = async (pageNumber) => {
        setRequesting(false);
        try{
            const orders = await searchOrders({...searchParams, page: pageNumber});
            setOrdersResponse(orders);
            setActivePage(pageNumber);
            setRequesting(false)
        }catch (error) {
            setErrorMessage("Unable to get records for page");
            setRequesting(false)
        }
    };
    
    const handleSubmit = async (values, resetCallBack) => {
        setRequesting(true);
        try{
            await createOrder(values);
            const orders = await searchOrders(searchParams);
            setOrdersResponse(orders);
            resetCallBack();
            setRequesting(false)
        } catch (e) {
            setRequesting(false);
        }

    };
    
    return (
        <div className="App">
            <div className="App-body">
                <header className={'text-center'}>
                    <img src={logo} className="App-logo" alt="logo" />
                </header>

                {/*    Error Message */}
                {
                    errorMessage &&
                    <Alert variant={"danger"}>
                        {errorMessage}
                    </Alert>
                }
                <SearchForm 
                    pizzaSizes={pizzaSizes}
                    pizzaTypes={pizzaTypes}    
                    formHandler={handleSubmit}
                    requesting={requesting}
                />

                
                <OrderList
                    orders={orders}
                    totalOrders={totalOrders}
                    activePage={activePage}
                    pageLimit={pageLimit}
                    handlePageClick={fetchPageOrders}
                />
            </div>
        </div>
    );
};

export default Order;