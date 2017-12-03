import React from 'react';

export default class WishlistItem extends React.Component {

    openUrl = () => {
        if (this.props.wish.url) {
            window.open(this.props.wish.url, "_blank");
        }
    }

    render() {
        return (
            <div className="row amatic wishlistItem" onClick={this.openUrl}>
            	<div className="col-md-3 col-sm-3 col-xs-3 wishlistItemPicture">
            		<i className={`material-icons ${ this.props.hideIcon ? 'hide' : '' }`}>card_giftcard</i>
                    <br />
                    {
                        this.props.wish.url ? (
                                <i className="material-icons">link</i>
                            ) : ""
                    }
            	</div>
            	<div className="col-md-9 col-sm-9 col-xs-9 text-left wishlistItemDetails">
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
            </div>
        );
    }
}