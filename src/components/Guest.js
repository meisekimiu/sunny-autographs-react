import React, { Component } from 'react';

export default class Guest extends Component {
	getDisplayName() {
		if(this.props.info.displayName) {
			return this.props.info.displayName;
		}
		return this.props.info.name;
	}
	makeSchedule(schedule) {
		let arr = [];
		for(let day in schedule) {
			arr.push(<div key={day}>
				<strong>{day}</strong>: <span>{schedule[day]}</span>
			</div>)
		}
		return arr;
	}
	render() {
		if(this.props.info) {
		return (
			<div>
				<div className="autograph-cover">
					<div className="autograph-guest-img"><img src={this.props.info.image} alt={this.props.info.name} /></div>
					<div className="autograph-guest-name"><span>{this.props.info.name}</span></div>
				</div>
				<div className="autograph-schedule">
					<div className="autograph-guest-name"><span>{this.getDisplayName()}</span></div>
					<div className="autograph-schedule-listing">
						{this.makeSchedule(this.props.info.schedule)}
					</div>
				</div>
			</div>
			);
		}
		else {
			return (
				<div />
			)
		}
	}
}
