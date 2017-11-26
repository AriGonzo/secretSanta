import React from 'react';

export default class GroupPageListItem extends React.Component {

    render() {
        return (
            <div>
                <h3 onClick={()=> { 
                    this.props.setActiveSelection(this.props.user)}
                }>{this.props.user.name}</h3>
            </div>
        );
    }
}