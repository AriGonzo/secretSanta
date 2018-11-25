import React from 'react';

import WishlistItem from './WishlistItem';
import AddWishModal from './AddWishModal';

import {API} from '../util/api';

export default class Wishlist extends React.Component {

	componentWillMount = () => {
		this.setState({
			showWishModal: false,
            activeSelection: this.props.activeSelection
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
                that.props.activeSelection.wishlist.unshift(wishAdded.data)
                that.closeModal();
            });
    }

    deleteWish = (wish) => {
        let that = this;
        let idx = that.props.activeSelection.wishlist.indexOf(wish);
        console.log(idx)
        that.props.activeSelection.wishlist.splice(idx, 1);
        API.deleteWish(wish._id)
            .then(function(){
                let idx = that.props.activeSelection.wishlist.indexOf(wish);
                that.props.activeSelection.wishlist.splice(idx, 1);
            });
    };

    renderWishes = () => {
        let that = this;
        return this.props.activeSelection.wishlist.map(function(wish, i){
            return <WishlistItem key={i} wish={wish} deleteWish={that.deleteWish}/>
        });
    };

    render() {
        return (
            <div className="full-width autoMargin wishlist">
            	<h3>Wishlist 
            		<span className="addWish" onClick={this.openNewWishModal}><i className="material-icons">add_circle_outline</i>
            			<span className="addWishText hidden-xs"> Add New</span>
        			</span>
    			</h3>
            	<div className="wishlistWrapper">
                {
                    this.props.activeSelection.wishlist.length > 0 ? this.renderWishes() : <WishlistItem hideIcon="true" wish={{description: "Your Wishlist is Empty! Add a wish!"}} />
                        
                }
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