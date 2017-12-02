import React from 'react';

export default class WishlistItem extends React.Component {

    render() {
        return (
            <div className="row amatic wishlistItem">
            	<div className="col-md-3 col-sm-3 col-xs-3 wishlistItemPicture">
            		<i className="material-icons">card_giftcard</i>
            	</div>
            	<div className="col-md-9 col-sm-9 col-xs-9 text-left wishlistItemDetails">
            		<h4>Here is the description by the user</h4>
            		<div className="metaDataPreview">
            			<h5>Header for Meta Preview</h5>
            			<p>Here is where the url description would come from</p>
            		</div>
            	</div>
            </div>
        );
    }
}