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
            <div>
                <h3>Name of List</h3>
                <input type="text" value={this.state.name} onChange={this.handleInputChange} />
                <button className="btn btn-lg btn-primary" onClick={this.nameList}>Next Step</button>
            </div>
        );
    }
}