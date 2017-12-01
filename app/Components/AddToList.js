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
            <div className="text-center nameListContainer">
                <h1>Add Person</h1>
                <input className="full-width buttonSpacing amatic" type="text" name="name" value={this.state.name} onChange={this.handleInputChange} placeholder="Name"/>
                <br />
                <input className="full-width buttonSpacing amatic" type="text" name="email" value={this.state.email} onChange={this.handleInputChange} placeholder="Email"/>
                <br />
                <button className="full-width btn btn-lg btn-lightdanger buttonSpacing" onClick={this.saveAndAdd}>Save and Add Another</button>
                <br />
                <button className="full-width btn btn-lg btn-danger buttonSpacing" onClick={this.props.done}>Done!</button>
            </div>
        );
    }
}