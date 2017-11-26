import React from 'react';
import { 
    Button,
    Modal 
} from 'react-bootstrap';
import TextLoop from 'react-text-loop';
import async from 'async';

import GroupPageListItem from './GroupPageListItem';

import util from '../util/utilityMethods';
import {API} from '../util/api';

export default class SelectionModal extends React.Component {

    componentWillMount =() => {
        this.setState({
            selectionMade: false
        });
    }

    componentDidMount = () => {
        this.runFilters();
    }

    componentDidUpdate = (prev) => {
        if (this.props.activeSelection._id !== prev.activeSelection._id) {
            this.runFilters();
        }
    }

    runFilters = () => {
        let that = this;
        this.filterOutUser().then(this.filterOutExceptions).then(function(filteredPool){
            that.setState({filteredPool});
        })
    }

    makeSelection = () => {
        let that = this;
        let randomNum = Math.floor(Math.random() * (this.state.filteredPool.length - 1))
        API.addUserSelection(this.props.activeSelection._id, this.state.filteredPool[randomNum]._id)
            .then(function(){
                that.setState({
                    selectionMade: that.state.filteredPool[randomNum]
                })
                that.props.refreshMasterPool();

            });

    }

    filterOutUser = () => {
        let that = this;
        return new Promise (function(resolve, reject){
            let filteredArray = that.props.masterPool.filter(function(user){
                return user._id !== that.props.activeSelection._id
            });
            resolve(filteredArray)
        });
    }

    filterOutExceptions = (passedArray) => {
        let that = this;
        return new Promise(function(resolve, reject){
            let filteredArray = passedArray.filter(function(user){
                return that.props.activeSelection.exceptions.indexOf(user._id) < 0
            });
            console.log('in exceptions')
            resolve(filteredArray)
        })
    }

    cleanupData = () => {
        this.setState({
            selectionMade: false
        });
        this.props.closeModal()
    }

    render() {
        return (
            <Modal show={this.props.showModal} onHide={()=> {this.cleanupData()}}>
                <Modal.Header closeButton>
                    <Modal.Title>Draw - {this.props.activeSelection.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <h2 className="text-center">
                {this.state.selectionMade ? (
                    this.state.selectionMade.name
                ):(
                    <TextLoop speed={150}>
                        {this.props.list.members.map(function(member, i){
                            return <span key={i}>{member.name}</span>
                        })}
                    </TextLoop>
                )}
                </h2>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                    bsStyle="danger"
                    bsSize="large"
                    className="center-block"
                    onClick={()=> {this.makeSelection()}}
                >Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}