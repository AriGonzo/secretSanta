import React from 'react';

export default class List extends React.Component {

	componentWillMount = () => {
		this.setState({
			listId: this.props.match.params.listId
		})
	}

    render() {
        return (
            <div>
                <h1>List {this.state.listId}</h1>
            </div>
        );
    }
}