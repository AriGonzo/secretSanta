import React from 'react';
import { 
    Button,
    Modal 
} from 'react-bootstrap';
import TextLoop from 'react-text-loop';

import {API} from '../util/api';

export default class AddWishModal extends React.Component {

    componentWillMount = () => {
        this.setState({
            description: "",
            url: "",
            validUrl: false,
            metadata: false,
            loading: false,
            errorScrape: false
        })
    }

    onChangeUrl = (event) => {
        const target = event.target;
        const url = target.value;
        let that = this;

        var validUrl = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z‌​]{2,6}\b([-a-zA-Z0-9‌​@:%_\+.~#?&=]*)/.test(url);

        this.setState({validUrl, url})

        if (validUrl) {
            this.setState({loading: true, errorScrape: false})
            
            console.log('running')

            let errorTimeout = setTimeout(function(){
                that.scrapeErrorTimeout();
            }, 7 * 1000)

            API.scrapeWebsite(url).then(function(metadata){
                clearTimeout(errorTimeout);
                if (metadata.data.general) {
                    that.setState({
                        metadata: true,
                        loading: false,
                        metaTitle: metadata.data.general.title,
                        metaDescription: metadata.data.general.description,
                    });
                } else {
                    that.scrapeErrorTimeout();
                }
            });

        } else {
            this.setState({metadata: false, metaTitle: "", metaDescription: ""})
        }
    }

    scrapeErrorTimeout = () => {
        this.setState({
            errorScrape: true,
            loading: false
        });
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

    cleanupData = () => {
        this.setState({metadata: false, validUrl: false, url: "", description: "", errorScrape: false})
    }

    render() {
        return (
            <Modal show={this.props.showModal} onEntered={this.playSound} onExited={this.cleanupData}>
                <Modal.Header>
                    <Modal.Title bsClass="amatic largerText">Add Wish</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="wishModalBody">
                        <input placeholder="Description" name="description" className="full-width amatic" type="text" onChange={this.onChange} />
                        <input placeholder="Url" name="url" className="full-width amatic" type="text" onChange={this.onChangeUrl} />
                        <p className={`amatic pull-right ${ this.state.url.length <= 0  ? 'hide': this.state.validUrl ? 'hide' : '' }`} ><em>Please enter a valid URL</em></p>
                    </div>
                    <div className={`loadingIndicator text-center amatic ${ this.state.loading ? '' : 'hide'}`}>
                        Fetching Preview <img src="/assets/images/loader.gif" width="40px" />
                    </div>
                    <div className="scrappedPreview amatic">
                    {
                        this.state.metadata ? (
                                <div className="metaDataPreview">
                                    <h5>{this.state.metaTitle}</h5>
                                    <h4>{this.state.metaDescription}</h4>
                                </div>
                            ) : ""
                    }
                    {
                        this.state.errorScrape ? (
                                <div className="metaDataPreview">
                                    <h5>Preview Not Available</h5>
                                </div>
                            ) : ""
                    }
                    </div>
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