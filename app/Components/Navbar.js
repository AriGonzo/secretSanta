import React from 'react';

export default class Navbar extends React.Component {

    render() {
        return (
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span> 
                  </button>
                  <a className="navbar-brand" href="/">Secret Santa</a>
                </div>
              </div>
            </nav>
        );
    }
}