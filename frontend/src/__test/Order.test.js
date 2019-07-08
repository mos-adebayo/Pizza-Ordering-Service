import React from "react";
import ReactDOM from "react-dom";
import { configure } from "enzyme";
import renderer from "react-test-renderer";
import Adapter from 'enzyme-adapter-react-16';
import Order  from "../Order/Order";

//Enzyme Configurations
configure({ adapter: new Adapter() });

test('Search Form renders without crashing', () => {

    const div = document.createElement('div');
    ReactDOM.render(
         <Order/>,
        div);
    ReactDOM.unmountComponentAtNode(div);
});

test('Search Form components snapshot', () => {

    const component = renderer.create(
        <Order />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

});