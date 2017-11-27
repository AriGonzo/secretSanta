import React from 'react';

import GroupPageListItem from './GroupPageListItem'

export default class GroupPageList extends React.Component {

    render() {
        let that = this;
        return (
            <div className="collapse navbar-collapse groupPageSpacing" id="myNavbar">
                { this.props.list.members.map(function(user, index){
                   return <GroupPageListItem activeSelection={that.props.activeSelection} key={index} user={user} setActiveSelection={that.props.setActiveSelection}/>
                })}
            </div>
        );
    }
}