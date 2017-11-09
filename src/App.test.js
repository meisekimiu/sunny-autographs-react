import React from 'react';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import {shallow} from 'enzyme';

import App from './App';

Enzyme.configure({adapter: new Adapter()});

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<App />, div);
});

it('renders based on globally set state', () => {
	window.guest_info = [
		{
		 name: "Baba Konomi",
		 image: "image.jpeg",
		 displayName: "Konomi Baba",
		 schedule: {
			 Friday: "2pm-4pm",
			 Saturday: "3pm-4pm"
		 }
	 },
	 {
	 	name: "Momose Rio",
	 	image: "image2.jpeg",
	 	displayName: "Rio Momose",
	 	schedule: {
	 		Saturday: "11am-1pm",
	 		Sunday: "12pm-2pm"
	 	}
	 }
	];
	const app = shallow(<App />);
	expect(app.find('Guest').length).toBe(2);
	expect(app.find('Guest').at(0).props()['info']).toBe(window.guest_info[0]);
	expect(app.find('Guest').at(1).props()['info']).toBe(window.guest_info[1]);
});
