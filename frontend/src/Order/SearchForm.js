import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, ErrorMessage } from 'formik';
import { Form, Button, Row, Col, Spinner } from  "react-bootstrap";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    customerName: Yup.string().required('Please enter customer name'),
    address: Yup.string().required('Please enter your address'),
    quantity: Yup.number()
        .required("Please enter quantity")
        .positive("Please enter valid quantity")
        .integer("Please enter valid quantity"),
    pizzaSizeId: Yup.string().required('Please select size'),
    pizzaTypeId: Yup.string().required('Please select type'),
});

const initialValues = { customerName: "", quantity: "", pizzaSizeId: "", pizzaTypeId: "", address: "" };

const SearchForm = ({ pizzaSizes, pizzaTypes, formHandler, requesting }) => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, ...props ) => {
                formHandler(values, props[0].resetForm);
            }}
        >
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label> Customer </Form.Label>
                                <Field type="text" name="customerName" placeholder={"Enter customer name"} className={'form-control'} />
                                <ErrorMessage name="customerName" component="div" className={"text-danger"} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label> Quantity </Form.Label>
                                <Field type="text" name="quantity" placeholder="Enter quantity" className={'form-control'} />
                                <ErrorMessage name="quantity" component="div" className={"text-danger"}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label> Pizza Size </Form.Label>
                                <Field component="select" name="pizzaSizeId" className={'form-control'} >
                                    <option value="-1">Select size</option>
                                    {
                                        pizzaSizes.map((item, index) => <option value={item.id} key={index}>
                                            {`${item.name}` }
                                        </option>)
                                    }
                                </Field>
                                <ErrorMessage name="pizzaSizeId" component="div"  className={"text-danger"}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label> Pizza Type </Form.Label>
                                <Field component="select" name="pizzaTypeId" className={'form-control'} >
                                    <option value="-1">Select type</option>
                                    {
                                        pizzaTypes.map((item, index) => <option value={item.id} key={index}>
                                            {`${item.name}` }
                                        </option>)
                                    }
                                </Field>
                                <ErrorMessage name="pizzaTypeId" component="div" className={"text-danger"} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label> Address </Form.Label>
                                <Field type="text" name="address" placeholder={"Enter address"} className={'form-control'} />
                                <ErrorMessage name="address" component="div" className={"text-danger"} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                {
                                    requesting ? (
                                        <Button disabled>
                                            <Spinner animation="grow" />
                                        </Button>
                                    ) : (
                                        <Button type="submit" className={'submit-btn'}>
                                            Make Order
                                        </Button>
                                    )
                                }
                            </Form.Group>
                        </Col>
                    </Row>
                </form>
            )}
        </Formik>
    );
};

SearchForm.propTypes = {
    pizzaSizes: PropTypes.array.isRequired,
    pizzaTypes: PropTypes.array.isRequired,
    formHandler: PropTypes.func.isRequired
};

export default SearchForm;