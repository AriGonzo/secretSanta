import React from 'react';

import {util} from '../util/utilityMethods';

export default class ExceptionOtherUser extends React.Component {

	componentWillMount = () => {
        this.setState({
            selected: false
        })

	}

    toggleException = () => {
        this.setState({
            selected: !this.state.selected
        });
        this.props.toggleException(this.props.member._id);
    }

    render() {
        return (
            <li className={`col-md-6 col-sm-6 col-xs-6 otherUsersWrapper ${this.state.selected ? 'selected' : 'unselected'}`}>
                <div className="otherUsers" id={`${this.props.member._id}_${this.props.thisMember._id}`} data-id={this.props.member._id} type="checkbox" onClick={this.toggleException}>
                    {this.props.member.name}
                </div>
            </li>
        );
    }
}