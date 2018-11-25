import React from 'react';
import { 
    Button,
    Modal 
} from 'react-bootstrap';
import TextLoop from 'react-text-loop';

import {API} from '../util/api';

export default class DeleteWishModal extends React.Component {


    render() {
        return (
            <Modal show={this.props.showModal}>
                <Modal.Header>
                    <Modal.Title bsClass="amatic largerText">Delete Wish</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3>Are You Sure you want to remove this wish?</h3>
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
                        onClick={()=> {
                            this.props.deleteWish(this.props.wish)
                            this.props.closeModal();
                        }}
                        >Done</Button>
                    </div>
                </Modal.Footer>
            </Modal>
        );
    }
}