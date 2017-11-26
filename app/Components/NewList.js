import React from 'react';

import NamingList from './NamingList';
import AddToList from './AddToList';
import Exceptions from './Exceptions';
import GroupPage from './GroupPage';

import {API} from '../util/api';

export default class NewList extends React.Component {

	componentWillMount = () => {
		this.setState({
			step: 1,
			nameOfList: null,
			users: [],
			list: null
		});
	}

	nameList = (text) => {
		this.setState({
			nameOfList: text
		});
		this.nextStep();
	}

	nextStep = () => {
		let step = this.state.step + 1
		this.setState({
			step: step
		});
	}

	saveAndAdd = (user) => {
		let newArray = this.state.users.slice();
		newArray.push(user)
		this.setState({
			users: newArray
		});
	}

	done = () => {
		let that = this;
		API.newList({
			name: this.state.nameOfList,
			users: this.state.users
		}).then(function(listFromServer){
			that.setState({
				list: listFromServer.data
			});
			that.nextStep();
		});
	}

	setStep = () => {
		switch(this.state.step) {
			case 1:
			return <NamingList nameList={this.nameList} />
			break
			case 2:
			return <AddToList saveAndAdd={this.saveAndAdd} done={this.done} />
			break
			case 3:
			return <Exceptions list={this.state.list} nextStep={this.nextStep} />
			case 4:
			return <GroupPage list={this.state.list} />
			break
			default:
			return <NamingList nextStep={this.nameList} />
		}
	}

    render() {
        return (
            <div>
                { this.setStep() }
            </div>
        );
    }
}