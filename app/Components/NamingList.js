import React from 'react';

import Button from './Button'

export default class NamingList extends React.Component {

    componentWillMount = () => {
        this.setState({
            name: ""
        })
    }

    handleInputChange = (event) => {
        const value = event.target.value;

        this.setState({
          name: value
        });
    }

    nameList = () => {
        this.props.nameList(this.state.name);
    }

    render() {
        return (
            <div className="text-center nameListContainer">
                <h1>Name of List</h1>
                <input placeholder="Name" className="full-width amatic" type="text" value={this.state.name} onChange={this.handleInputChange} />
                <br />
                <button className="btn btn-lg btn-danger buttonSpacing" onClick={this.nameList}>Next Step</button>
            </div>
        );
    }
}