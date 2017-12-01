import React from 'react';

import ExceptionListItem from './ExceptionListItem';
import { API } from '../util/api';

export default class Exceptions extends React.Component {

    componentWillMount = () => {
        this.setState({
            list: this.props.list
        });
    }

	renderListItems = () => {
		let that = this;
		let mappedItems = this.state.list.members.map(function(member, index){
			return <ExceptionListItem key={index} thisMember={member} list={that.props.list} updatedException={that.updatedException} />
		});
		return mappedItems
	}

    updatedException = (updatedList) => {
        this.setState({
            list: updatedList
        });
    }

    clickHander = () => {
        let that = this;
        API.applyExceptions(this.props.list).then(function(response){
            console.log('exceptions applied!');
            window.location.href=`/show/list/${that.props.list._id}`
        });
    }

    render() {
        return (
            <div>
            	<div className="row">
                	{ this.renderListItems() }
            	</div>
            	<div className="text-center">
            		<button className="btn btn-lg btn-primary buttonSpacing full-width" onClick={this.clickHander}>Done!</button>
            	</div>
            </div>
        );
    }
}