import React from 'react';

import Button from './Button'

export default class Home extends React.Component {

    render() {
        return (
        	<div className="row">
        		<div className="col-md-6 col-sm-12 col-xs-12 text-center">
        			<Button text="Make a List" href="/newList" />
        		</div>
        		<div className="col-md-6 col-sm-12 col-xs-12 text-center">
        			<Button text="Check it twice" href="/lists" />
        		</div>
        	</div>
        );
    }
}