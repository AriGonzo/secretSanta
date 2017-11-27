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
            <div className="nameListContainer text-center groupPageSpacing">
                {
                    this.props.activeSelection ? (
                        <div className="activeSelectionWrapper">
                            <h1>Details for:</h1>
                            <h2 className="amatic"> {this.props.activeSelection.name}</h2>
                            {
                                this.props.activeSelection.selected ? (
                                        <Button 
                                            bsStyle="danger"
                                            bsSize="large"
                                            className="full-width"
                                            onClick={this.openSelectionModal}
                                        >Remind Me!</Button>
                                    ) : (
                                        <Button 
                                            bsStyle="danger"
                                            bsSize="large"
                                            className="full-width"
                                            onClick={this.openSelectionModal}
                                        >Draw!</Button>
                                    )
                            }
                            <Button 
                                bsStyle="primary"
                                bsSize="large"
                                className="full-width buttonSpacing"
                                onClick={this.openSelectionModal}
                            >View/Edit Wish List</Button>
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
                        <h1>No User Selected</h1>
                        )
                }
            </div>
        );
    }
}