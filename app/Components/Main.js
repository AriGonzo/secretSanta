import React from 'react';
import {
    BrowserRouter as Router,
    Route,
	Switch
} from 'react-router-dom';

import Home from './Home';
import NewList from './NewList';
import Lists from './Lists';
import GroupPage from './GroupPage';
import User from './User';
import Navbar from './Navbar';

import {API} from '../util/api';

export default class Main extends React.Component {

    render() {
        return (
            <Router>
                <div className="container">
                    <Navbar />
    				<Switch>
    				  <Route exact path="/" component={Home} />
    				  <Route path="/newList" component={NewList} />
    				  <Route path="/lists" component={Lists} />
    				  <Route path="/show/list/:listId" component={GroupPage} />
                      <Route path="/show/user/:userId" component={User} />
    				</Switch>
                </div>
            </Router>
        );
    }
}