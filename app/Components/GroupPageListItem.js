import React from 'react';

export default class GroupPageListItem extends React.Component {

    render() {
        return (
            <div className={`nameListContainer amatic groupListItem ${this.props.activeSelection && this.props.activeSelection._id == this.props.user._id ? `selected` : ``}`}>
                <h1 onClick={()=> { 
                    this.props.setActiveSelection(this.props.user)}
                }>{this.props.user.name}</h1>
            </div>
        );
    }
}