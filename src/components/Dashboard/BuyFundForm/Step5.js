'use strict';

import React, {Component} from 'react';
import { Link } from 'react-router-dom'

export default class Step5 extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    // not required as this component has no forms or user entry
    // isValidated() {}

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <div className={"text-center"}>
                        <i className="fa fa-check fa-3x mb-2"></i>
                        <p>You have created a fixed plan successfully. To complete your savings, take the big step!</p>
                        <Link to={"/dashboard/save"} className={"btn btn-primary "}>Save Now</Link>
                    </div>
                </div>
            </div>
        )
    }
}
