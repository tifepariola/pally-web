'use strict';

import React, { Component } from 'react';

export default class Step8 extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {}

    componentWillUnmount() {}

    // not required as this component has no forms or user entry
    // isValidated() {}

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <i className="fa fa-check"></i>
                </div>
            </div>
        )
    }
}