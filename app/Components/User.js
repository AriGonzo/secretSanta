import React from 'react';

export default class User extends React.Component {

	componentWillMount = () => {
		this.setState({
			userId: this.props.match.params.userId
		})
	}

    render() {
        return (
            <div>
                <h1>User {this.state.userId}</h1>
            </div>
        );
    }
}