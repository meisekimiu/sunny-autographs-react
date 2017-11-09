import React, { Component } from 'react';

export default class Guest extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active: false
		};
	}
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
	getCoverClass() {
		return "autograph-cover" + (!this.isActive() ? " autograph-visible" : "");
	}
	getScheduleClass() {
		return "autograph-schedule" + (this.isActive() ? " autograph-visible" : "");
	}
	isActive() {
		return this.state.active;
	}
	handleClick() {
		this.setState({
			active: !this.state.active
		});
	}
	render() {
		console.log(this.getCoverClass());
		if(this.props.info) {
		return (
			<div>
				<div className={this.getCoverClass()}>
					<div className="autograph-guest-img"><img src={this.props.info.image} alt={this.props.info.name} /></div>
					<div className="autograph-guest-name"><span>{this.props.info.name}</span></div>
				</div>
				<div className={this.getScheduleClass()}>
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
