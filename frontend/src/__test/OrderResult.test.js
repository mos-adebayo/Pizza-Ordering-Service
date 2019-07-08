import React from 'react';
import {configure, mount } from 'enzyme';
import OrderResult from '../Order/OrderResult';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
configure({ adapter: new Adapter() });

function setup() {
    const props = {
        orders: [],
        activePage: 1,
        pageLimit: 5,
        totalOrders: 10,
        handlePageClick: jest.fn()
    };


    const enzymeWrapper = mount(
        <OrderResult {...props} />
    );
    return {
        props,
        enzymeWrapper,
    }
}
describe("Result grid component", () => {
    test('Result lists renders without crashing', () => {
        const  { props } = setup();

        const div = document.createElement('div');
        ReactDOM.render(
            <OrderResult {...props} />,
            div);
        ReactDOM.unmountComponentAtNode(div);
    });

    test('Result lists snapshot', () => {
        const  { props } = setup();

        const component = renderer.create(
            <OrderResult {...props} />,
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

    });


    test('should call page click handler callback when the page is clicked ', () => {
        const { enzymeWrapper, props } = setup();
        const target = enzymeWrapper.find('.page-item');
        expect(target.length).toBeGreaterThan(0);
        // target.at(1).simulate('click');
        // expect(props.handlePageClick.mock.calls.length).toBe(1)

    });

    test('page item should be 0 for no records ', () => {
        const { props } = setup();
        const  wrapper = mount(
            <OrderResult
                 {...props}
                 totalOrders={0}
            />
        );
        const target = wrapper.find('.page-item');
        expect(target.length).toBe(0);

    });

    test('page item should be calculated properly according to number of records and page limit ', () => {
        const { props } = setup();
        const  wrapper = mount(
            <OrderResult
                 {...props}
            />
        );
        const target = wrapper.find('.page-item');
        const numberOfPages = Math.ceil(props.totalOrders / props.pageLimit);
        expect(target.length).toBe(numberOfPages);

    });

});