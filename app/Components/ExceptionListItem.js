import React from 'react';

import {util} from '../util/utilityMethods';

export default class ExceptionListItem extends React.Component {

	componentWillMount = () => {
        //Remove the current user from the total team list
        let clonedArray = util.removeFromArray(this.props.list.members, this.props.thisMember);

        this.setState({
            model: this.props.thisMember,
            restOfList: clonedArray
        });

	}

    toggleException = (id) => {
        let exceptionList = this.props.thisMember.exceptions;
        console.log(exceptionList)
        console.log(id)

        if (exceptionList.indexOf(id)) {
            exceptionList.push(id)
        } else {
            let newExceptionList = util.removeFromArray(exceptionList, id);
            this.props.thisMember.exceptions = newExceptionList;
        }
    }

    renderListItems = () => {
        let that = this;
        let mappedItems = this.state.restOfList.map(function(member, index){
            return (
                <li key={index}>
                    <label htmlFor={`${member._id}_${that.props.thisMember._id}`}>
                        <input id={`${member._id}_${that.props.thisMember._id}`} data-id={member._id} type="checkbox" onChange={()=> {that.toggleException(member._id)}} />
                        {member.name}
                    </label>
                </li>
            )
        });
        return mappedItems
    }

    render() {
        return (
            <div>
                <h3>{this.props.thisMember.name}</h3>
                <ul>
                    { this.renderListItems() }
                </ul>
            </div>
        );
    }
}