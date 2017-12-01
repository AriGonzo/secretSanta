import React from 'react';
import {
    Route,
    Link
} from 'react-router-dom';

export default class Navbar extends React.Component {

    componentWillMount = (props) => {
      this.state = {}
      this.setHamburgerVisibility();
    }

    componentDidUpdate = (prev) =>{
      if (window.location.pathname.indexOf('show/list') !== -1 && this.state.showHamburger == -1) {
        this.setHamburgerVisibility();
      }
    }

    setHamburgerVisibility = () => {
      this.setState({
        showHamburger: window.location.pathname.indexOf('show/list')
      });
    }

    render() {
        return (
            <nav className="navbar navbar-default navbar-fixed-top">
              <div className="container">
                <div className="navbar-header">
                  <button type="button" className={`navbar-toggle ${this.state.showHamburger == -1 ? `hide` : ``}`} data-toggle="collapse" data-target="#myNavbar">
                    <i className="material-icons userDrawerIcon">people</i>
                  </button>
                  <Link className="navbar-brand" to="/">Secret Santa</Link>
                </div>
              </div>
            </nav>
        );
    }
}