import React from 'react';

import WishlistItem from './WishlistItem';
import AddWishModal from './AddWishModal';

import {API} from '../util/api';

export default class Wishlist extends React.Component {

	componentWillMount = () => {
		this.setState({
			showWishModal: false,
            wishlist: this.props.wishlist
		});
	}

	openNewWishModal = () => {
		this.setState({
			showWishModal: true
		})
	}

    closeModal = () => {
        this.setState({
            showWishModal: false
        });
    }

    addWish = (wish) => {
        let that = this;
        API.addWish(this.props.activeSelection._id, wish)
            .then(function(wishAdded){
                let newArray = that.state.wishlist.slice();
                newArray.push(wishAdded)
                that.setState({
                    wishlist: newArray
                });
                that.closeModal();
            });
    }

    render() {
        return (
            <div className="full-width autoMargin wishlist">
            	<h3>Wishlist 
            		<span className="addWish" onClick={this.openNewWishModal}><i className="material-icons">add_circle_outline</i>
            			<span className="addWishText hidden-xs"> Add New</span>
        			</span>
    			</h3>
            	<div className="wishlistWrapper">
	            	<WishlistItem />
	            	<WishlistItem />
	            	<WishlistItem />
	            	<WishlistItem />
            	</div>
                <AddWishModal 
                    activeSelection={this.props.activeSelection}
                    showModal={this.state.showWishModal}
                    closeModal={this.closeModal} 
                    addWish={this.addWish}
                />
            </div>
        );
    }
}