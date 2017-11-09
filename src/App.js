import React, { Component } from 'react';

import Guest from './components/Guest';

class App extends Component {
	getGuests() {
		if(window.guest_info) {
			return window.guest_info.map(function(guest_info) {
				return (
					<Guest key={guest_info.name} info={guest_info} />
				);
			});
		}
	}
	render() {
	return (
		<div>
			{this.getGuests()}
		</div>
		);
	}
}

export default App;
