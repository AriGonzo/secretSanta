import React from 'react';

import ExceptionOtherUser from './ExceptionOtherUser';

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
        this.props.updatedException(this.props.list)
    }

    renderListItems = () => {
        let that = this;
        let mappedItems = this.state.restOfList.map(function(member, index){
            return (
                <ExceptionOtherUser key={index} thisMember={that.props.thisMember} member={member} toggleException={that.toggleException} />
            )
        });
        return mappedItems
    }

    render() {
        return (
            <div className="col-md-6 col-sm-6 col-xs-12">
                <div className="exceptionListItem text-center amatic">
                    <h3>{this.props.thisMember.name}</h3>
                    <ul className="row otherUserList">
                        { this.renderListItems() }
                    </ul>
                </div>
            </div>
        );
    }
}