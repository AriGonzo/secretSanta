import React from 'react';
import { 
    Button,
    Modal 
} from 'react-bootstrap';
import TextLoop from 'react-text-loop';

export default class AddWishModal extends React.Component {

    componentWillMount = () => {
        this.setState({
            description: "",
            url: ""
        })
    }

    onChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
    }

    addWish = () => {
        this.props.addWish(this.state);
    }

    render() {
        return (
            <Modal show={this.props.showModal} onEntered={this.playSound} onExited={()=> {this.cleanupData()}}>
                <Modal.Header>
                    <Modal.Title bsClass="amatic largerText">Add Wish</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="wishModalBody">
                        <input placeholder="Description" name="description" className="full-width amatic" type="text" onChange={this.handleInputChange} />
                        <input placeholder="Url" name="url" className="full-width amatic" type="text" onChange={this.handleInputChange} />
                    </div>
                    <div className="scrappedPreview"></div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="text-center">
                        <Button 
                        bsStyle="danger"
                        bsSize="large"
                        onClick={this.props.closeModal}
                        >Cancel</Button>
                        <Button 
                        bsStyle="danger"
                        bsSize="large"
                        onClick={this.addWish}
                        >Done</Button>
                    </div>
                </Modal.Footer>
            </Modal>
        );
    }
}