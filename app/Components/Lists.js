import React from 'react';

import {API} from '../util/api';

export default class Lists extends React.Component {
	componentWillMount = () => {
        let that = this;
        this.setState({
            lists: []
        })
		API.getAllLists()
			.then(function(lists){
                let listsArray = lists.data
				that.setState({lists: listsArray})
			});
	}

    render() {
        return (
            <div className="text-center nameListContainer row">
                <h1 className="col-md-12 col-sm-12 col-xs-12">Lists</h1>
                {
                    this.state.lists.map(function(list, i){
                        return (
                                <div className="col-md-4 col-sm-12 col-xs-12 groupListItem amatic">
                                    <div>
                                        <a key={i} href={`/show/list/${list._id}`}>
                                            <h2> {list.name} </h2>
                                        </a>
                                    </div>
                                </div>
                            )
                    })
                }
            </div>
        );
    }
}

