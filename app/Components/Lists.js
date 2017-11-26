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
        console.log(this.state)
        return (
            <div>
                <h1>Lists</h1>
                {
                    this.state.lists.map(function(list, i){
                        return (
                                <a key={i} href={`/show/list/${list._id}`}>
                                    <h3> {list.name} </h3>
                                </a>
                            )
                    })
                }
            </div>
        );
    }
}