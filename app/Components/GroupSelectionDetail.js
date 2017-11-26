import React from 'react';
import { 
    Button 
} from 'react-bootstrap';

import GroupPageListItem from './GroupPageListItem';
import SelectionModal from './SelectionModal';

export default class GroupSelectionDetail extends React.Component {

    componentWillMount = () => {
        this.setState({
            showModal: false
        });
    }

    openSelectionModal = () => {
        this.setState({
            showSelectionModal: true
        });
    }

    closeModal = () => {
        this.setState({
            showSelectionModal: false
        })
    }

    render() {
        return (
            <div>
                {
                    this.props.activeSelection ? (
                        <div>
                            <h3> {this.props.activeSelection.name} details </h3>
                            <Button 
                                bsStyle="primary"
                                bsSize="large"
                                onClick={this.openSelectionModal}
                            >Draw!</Button>
                            <SelectionModal 
                                activeSelection={this.props.activeSelection}
                                showModal={this.state.showSelectionModal}
                                closeModal={this.closeModal} 
                                list={this.props.list}
                                masterPool={this.props.masterPool}
                                refreshMasterPool={this.props.refreshMasterPool}
                            />
                        </div>
                        ) : (
                        <h3>No User Selected</h3>
                        )
                }
            </div>
        );
    }
}