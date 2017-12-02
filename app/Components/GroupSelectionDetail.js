import React from 'react';
import { 
    Button 
} from 'react-bootstrap';

import GroupPageListItem from './GroupPageListItem';
import SelectionModal from './SelectionModal';
import Wishlist from './Wishlist';

import {API} from '../util/api';

export default class GroupSelectionDetail extends React.Component {

    componentWillMount = () => {
        this.setState({
            showModal: false
        });
        this.selectionSound = new Audio("/assets/sounds/tada.WAV");
        this.clickSound = new Audio("/assets/sounds/taka.wav");
        this.clickSound.loop = true;
    }

    openSelectionModal = () => {
        this.soundManager('taka')
        this.setState({
            showSelectionModal: true
        });
    }

    triggerEmail = () => {
        console.log('fire');
        API.triggerEmail(this.props.activeSelection._id)
            .then(function(){
                alert("email sent")
            });
    }

    closeModal = () => {
        let that = this;
        this.setState({
            showSelectionModal: false
        });
        API.updateDrawn(this.props.activeSelection._id)
            .then(function(){
                that.props.activeSelection.drawn = true;
                that.forceUpdate();
            });
        this.soundManager('stopTaka');
    }

    soundManager = (audio) => {
        switch(audio) {
            case 'taka':
                this.clickSound.play();
                break;
            case 'tada':
                this.soundManager("stopTaka");
                this.selectionSound.play();
                break
            case 'stopTaka':
                this.clickSound.pause();
                this.clickSound.currentTime = 0;
                break;

        }
    }

    render() {
        return (
            <div className="nameListContainer text-center groupPageSpacing">
                {
                    this.props.activeSelection ? (
                        <div className="activeSelectionWrapper">
                            <h1>Details for:</h1>
                            <h2 className="amatic"> {this.props.activeSelection.name}</h2>
                            { this.props.activeSelection.drawn ? (
                                <Button 
                                    bsStyle="danger"
                                    bsSize="large"
                                    className="full-width"
                                    onClick={this.triggerEmail}
                                >Remind Me!</Button>
                                ) : (
                                <Button 
                                    bsStyle="danger"
                                    bsSize="large"
                                    className="full-width"
                                    onClick={this.openSelectionModal}
                                >Draw!</Button>
                                ) }
                            <Button 
                                bsStyle="primary"
                                bsSize="large"
                                className="full-width buttonSpacing hide"
                                onClick={this.openSelectionModal}
                            >View/Edit Wish List</Button>
                            <SelectionModal 
                                activeSelection={this.props.activeSelection}
                                showModal={this.state.showSelectionModal}
                                closeModal={this.closeModal} 
                                list={this.props.list}
                                soundManager={this.soundManager}
                            />
                            <Wishlist 
                                activeSelection={this.props.activeSelection}
                            />
                        </div>
                        ) : (
                        <h1>No User Selected</h1>
                        )
                }
            </div>
        );
    }
}