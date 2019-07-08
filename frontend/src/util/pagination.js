import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from "react-bootstrap";

const PaginationComponent = ({ activePage, totalItems, pageLimit, handlePageClick})  =>  {
    const numberOfPages = Math.ceil(totalItems / pageLimit);
    return (
        <Pagination>
            {
                new Array(numberOfPages).fill(1).map((item, index) => (
                    <Pagination.Item key={index} active={(index + 1) === activePage } onClick={() => handlePageClick(index + 1)}>
                        {index + 1}
                    </Pagination.Item>))
            }
        </Pagination>
    );
};

PaginationComponent.propTypes = {
    activePage: PropTypes.number.isRequired,
    totalItems: PropTypes.number.isRequired,
    pageLimit: PropTypes.number.isRequired,
    handlePageClick: PropTypes.func.isRequired,
};

export default PaginationComponent;