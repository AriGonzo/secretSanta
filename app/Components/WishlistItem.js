import React from 'react';

import DeleteWishModal from './DeleteWishModal';

export default class WishlistItem extends React.Component {

    componentWillMount = () => {
        this.setState({
            showWishModal: false,
            activeSelection: this.props.activeSelection
        });
    }

    openDeleteWishModal = () => {
        this.setState({
            showDeleteModal: true
        })
    }

    closeDeleteWishModal = () => {
        this.setState({
            showDeleteModal: false
        })
    }

    openUrl = () => {
        if (this.props.wish.url) {
            window.open(this.props.wish.url, "_blank");
        }
    }

    render() {
        return (
            <div className="row amatic wishlistItem">
                <i className={`material-icons deleteWish ${ this.props.hideIcon ? 'hide' : '' }`} onClick={this.openDeleteWishModal}>delete</i>
            	<div className="col-md-3 col-sm-3 col-xs-3 wishlistItemPicture" onClick={this.openUrl}>
                    <i className={`material-icons ${ this.props.hideIcon ? 'hide' : '' }`}>card_giftcard</i>
                    <br />
                    {
                        this.props.wish.url ? (
                                <div className="iconWrapper">
                                    <i className="material-icons">link</i>
                                    <p>link</p>
                                </div>
                            ) : ""
                    }
            	</div>
            	<div className="col-md-8 col-sm-8 col-xs-8 text-left wishlistItemDetails" onClick={this.openUrl}>
                    {
                        this.props.wish.description ? <h4>{this.props.wish.description}</h4> : ""
                    }
                    {
                        this.props.wish.metaTitle ? (
                                <div className="metaDataPreview">
                                    <h5>{this.props.wish.metaTitle}</h5>
                                    <p>{this.props.wish.metaDescription}</p>
                                </div>
                            ) : ""
                    }
            	</div>
                <DeleteWishModal 
                    showModal={this.state.showDeleteModal}
                    closeModal={this.closeDeleteWishModal}
                    wish={this.props.wish} 
                    deleteWish={this.props.deleteWish}
                />
            </div>
        );
    }
}