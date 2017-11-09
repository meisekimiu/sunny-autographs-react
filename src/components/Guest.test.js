import React from 'react';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import {shallow} from 'enzyme';

import Guest from './Guest';

Enzyme.configure({adapter: new Adapter()});

const info = {
	name: "Baba Konomi",
	image: "image.jpeg",
	displayName: "Konomi Baba",
	schedule: {
		Friday: "2pm-4pm",
		Saturday: "3pm-4pm"
	}
};

const info2 = {
	name: "Momose Rio",
	image: "image2.jpeg",
	displayName: "Rio Momose",
	schedule: {
		Saturday: "11am-1pm",
		Sunday: "12pm-2pm"
	}
};

function makeGuest(info) {
	return shallow((
		<Guest info={info} />
	));
}

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Guest />, div);
});

it('renders guest name', () => {
	expect(makeGuest(info).contains(<span>Baba Konomi</span>)).toBe(true);
	expect(makeGuest(info2).contains(<span>Momose Rio</span>)).toBe(true);
});

it('renders guest image', () => {
	expect(makeGuest(info).contains(<img src="image.jpeg" alt="Baba Konomi" />)).toBe(true);
	expect(makeGuest(info2).contains(<img src="image2.jpeg" alt="Momose Rio" />)).toBe(true);
});

it('renders guest display name', () => {
	expect(makeGuest(info).contains(<span>Konomi Baba</span>)).toBe(true);
	let info3 = info2;
	info3.displayName = null;
	expect(makeGuest(info3).contains(<span>Rio Momose</span>)).toBe(false);

	expect(makeGuest(info2).find("span[children='Momose Rio']").length).toBeGreaterThanOrEqual(2);
});

it('renders the schedule', () => {
	let guest1_schedule = makeGuest(info).find('.autograph-schedule-listing');
	let guest2_schedule = makeGuest(info2).find('.autograph-schedule-listing');

	expect(guest1_schedule.find('strong').at(0).text()).toBe("Friday");
	expect(guest1_schedule.find('span').at(0).text()).toBe("2pm-4pm");

	expect(guest2_schedule.find('strong').at(0).text()).toBe("Saturday");
	expect(guest2_schedule.find('span').at(0).text()).toBe("11am-1pm");
	expect(guest2_schedule.find('strong').at(1).text()).toBe("Sunday");
	expect(guest2_schedule.find('span').at(1).text()).toBe("12pm-2pm");
});

it('swaps classes on click', () => {
	let guest = makeGuest(info);
	expect(guest.find('.autograph-cover').hasClass('autograph-visible')).toBe(true);
	expect(guest.find('.autograph-schedule').hasClass('autograph-visible')).toBe(false);
	guest.instance().handleClick();
	guest.update();
	expect(guest.find('.autograph-cover').hasClass('autograph-visible')).toBe(false);
	expect(guest.find('.autograph-schedule').hasClass('autograph-visible')).toBe(true);
});
