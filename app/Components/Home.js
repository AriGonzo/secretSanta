import React from 'react';

import Button from './Button'

export default class Home extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            style: "plain"
        }
    };

    render() {
        return (
        	<div className="row homePageButtonWrapper">
        		<div className="col-md-6 col-sm-12 col-xs-12 text-center">
        			<Button text="Make a List" href="/newList" />
        		</div>
        		<div className="col-md-6 col-sm-12 col-xs-12 text-center">
        			<Button text="Check it twice" href="/lists" />
        		</div>
                <div className="col-md-12 col-sm-12 col-xs-12 text-center braesSanta">
                    <img src="http://www.gifs.cc/christmas/santa-pulled-by-reindeer.gif" />
                </div>
        	</div>
        );
    }
}