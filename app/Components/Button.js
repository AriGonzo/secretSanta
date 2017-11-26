import React from 'react';
import {
    Route,
    Link
} from 'react-router-dom';

export default class Button extends React.Component {
   
    render() {
        return (
            <div className="buttonSpacing">
                <Link to={this.props.href}
                      className={this.props.tabClass} >
                    <button className="btn btn-danger btn-lg" onClick={this.props.buttonClicked} type="button">{this.props.text}</button>
                </Link>
            </div>
        );
    }
}