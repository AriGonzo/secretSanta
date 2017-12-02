import React from 'react';
import { 
    Button,
    Modal 
} from 'react-bootstrap';
import TextLoop from 'react-text-loop';

export default class SelectionModal extends React.Component {

    componentWillMount =() => {
        this.setState({
            selected: false,
            selectionMade: this.props.activeSelection.selected
        });

        this.selectionSound = new Audio("/assets/sounds/tada.WAV");
        this.clickSound = new Audio("/assets/sounds/taka.wav");
        this.clickSound.loop = true;
    }

    componentDidUpdate = (prev) => {
        if (this.props.activeSelection._id !== prev.activeSelection._id) {
            this.setState({
                selected: false,
                selectionMade: this.props.activeSelection.selected
            });
        }
    }

    makeSelection = () => {
        this.clickSound.pause();
        this.clickSound.currentTime = 0;
        this.selectionSound.play();
        let that = this;
        this.setState({
            selected: true
        });
    }

    cleanupData = () => {
        this.setState({
            selected: false
        });
        this.props.closeModal()
    }

    playSound = () => {
        this.clickSound.play();
    }

    render() {
        return (
            <Modal show={this.props.showModal} onEntered={this.playSound} onExited={()=> {this.cleanupData()}}>
                <Modal.Header>
                    <Modal.Title bsClass="amatic largerText">Draw - {this.props.activeSelection.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <h2 className="text-center amatic">
                {this.state.selected ? (
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
                    {
                        this.state.selected ? (
                                <Button 
                                bsStyle="danger"
                                bsSize="large"
                                className="center-block"
                                onClick={()=> {this.props.closeModal()}}
                                >Close</Button>
                            ) : (
                                <Button 
                                bsStyle="danger"
                                bsSize="large"
                                className="center-block"
                                onClick={()=> {this.makeSelection()}}
                                >Select</Button>
                            )
                    }
                </Modal.Footer>
            </Modal>
        );
    }
}