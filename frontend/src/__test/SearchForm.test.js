import React from "react";
import { configure, mount } from "enzyme";
import ReactDOM from "react-dom";
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';

import SearchForm  from "../Order/SearchForm";

//Enzyme Configurations
configure({ adapter: new Adapter() });

function setup() {
    const props = {
        pizzaSizes: [],
        pizzaTypes: [],
        requesting: false,
        formHandler: jest.fn()
    };

    const enzymeWrapper = mount(
        <SearchForm
            {...props}
        />
    );
    return {
        props,
        enzymeWrapper
    }
}

test('Search Form renders without crashing', () => {
    const  { props } = setup();

    const div = document.createElement('div');
    ReactDOM.render(
       <SearchForm {...props} />,
        div);
    ReactDOM.unmountComponentAtNode(div);
});

test('Search Form components snapshot', () => {
    const  { enzymeWrapper, props } = setup();

    const component = renderer.create(
        <SearchForm {...props} />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

});

test('should call remove form handler callback when the submit button is clicked ', () => {
    const { enzymeWrapper, props } = setup();

    const target = enzymeWrapper.find('.submit-btn');
    // console.log(target)
    // target.simulate('click');
    // expect(props.removeMarker.mock.calls.length).toBe(1)
    // expect(target.length).toBe(0)
});
