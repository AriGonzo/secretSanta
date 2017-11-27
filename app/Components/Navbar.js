import React from 'react';

export default class Navbar extends React.Component {

    componentWillMount = () =>{
      this.setState({
        showHamburger: window.location.pathname.indexOf('show/list')
      });
      console.log(this.state)
    }

    render() {
      console.log(this.state)
        return (
            <nav className="navbar navbar-default navbar-fixed-top">
              <div className="container">
                <div className="navbar-header">
                  <button type="button" className={`navbar-toggle ${this.state.showHamburger != -1 ? `` : `hide`}`} data-toggle="collapse" data-target="#myNavbar">
                    <i className="material-icons userDrawerIcon">people</i>
                  </button>
                  <a className="navbar-brand" href="/">Secret Santa</a>
                </div>
              </div>
            </nav>
        );
    }
}