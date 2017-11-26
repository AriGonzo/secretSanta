import React from 'react';

export default class AddToList extends React.Component {

	componentWillMount = () => {
		this.setState({
			name: "",
			email: ""
		})
	}

	handleInputChange = (event) => {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
		  [name]: value
		});
	}

	saveAndAdd = () => {
		this.props.saveAndAdd(this.state)
		this.setState({
			name: "",
			email: ""
		})
	}

    render() {
        return (
            <div>
                <h3>Add Person</h3>
                <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} placeholder="Name"/>
                <input type="text" name="email" value={this.state.email} onChange={this.handleInputChange} placeholder="Email"/>
                <button className="btn btn-lg btn-primary" onClick={this.saveAndAdd}>Save and Add Another</button>
                <button className="btn btn-lg btn-primary" onClick={this.props.done}>Done!</button>
            </div>
        );
    }
}