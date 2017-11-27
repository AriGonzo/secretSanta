import React from 'react';
import {
    Route,
    Link
} from 'react-router-dom';

import GroupPageList from './GroupPageList';
import GroupSelectionDetail from './GroupSelectionDetail';

import { API } from '../util/api';

export default class GroupPage extends React.Component {

	componentWillMount = () => {
		this.setState({
			list: null,
			activeSelection: null
		});
		this.refreshData();
	}

	refreshData = () => {
		let that = this;
		API.getData('list', this.props.match.params.listId)
			.then(function(response){
				that.setState({
					list: response.data,
					activeSelection: response.data.members[0]
				});
				that.createMasterPool()
			});
	}

	createMasterPool = () => {
		let masterPool = this.state.list.members.filter(member => !member.amISelected);
		this.setState({masterPool})
	}

	setActiveSelection = (activeSelection) => {
		$(".navbar-collapse").collapse('hide')
		this.setState({activeSelection})
	}

    render() {
        return (
            <div>
                {this.state.list ? (
                	<div className="row">
                		<div className="col-md-4 col-sm-4 col-xs-12">
                			<GroupPageList 
                				list={this.state.list} 
                				setActiveSelection={this.setActiveSelection}
                				activeSelection={this.state.activeSelection}
            				/>
                		</div>
                		<div className="col-md-8 col-sm-8 col-xs-12">
                			<GroupSelectionDetail 
	                			activeSelection={this.state.activeSelection}
	                			list={this.state.list} 
	                			masterPool={this.state.masterPool}
	                			refreshMasterPool={this.refreshData}
                			/>
                		</div>
	                </div>
                	) : (
                	<h3> Loading List </h3>
                	)
                }
            </div>
        );
    }
}