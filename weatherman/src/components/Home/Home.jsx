import React, { Component } from 'react';
import CommentBox from '../CommentBox/CommentBox';

export default class Home extends Component {
    render() {
        return (
            <div>
                <h1>Home</h1><hr/>
                    <h3>Welcome to Weatherman!!!</h3><hr/>
                    <CommentBox />
            </div>
        );
    }
}