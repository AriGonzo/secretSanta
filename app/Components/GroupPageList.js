import React from 'react';

import GroupPageListItem from './GroupPageListItem'

export default class GroupPageList extends React.Component {

    render() {
        let that = this;
        return (
            <div>
                { this.props.list.members.map(function(user, index){
                   return <GroupPageListItem key={index} user={user} setActiveSelection={that.props.setActiveSelection}/>
                })}
            </div>
        );
    }
}