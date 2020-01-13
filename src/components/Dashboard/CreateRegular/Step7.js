'use strict';

import React, { Component } from 'react';

export default class Step7 extends Component {
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
                    Plan Name:
                    <table className="table">
                        <tr>
                            <td>
                                <label>Amount</label>
                                <input type="text" className="form-control-plaintext" value="20,000" disabled />
                            </td>
                            <td>Frequency</td>
                        </tr>
                        <tr>
                            <td>Start Date</td>
                            <td>Maturity</td>
                        </tr>
                        <tr>
                            <td>Interest rate p.a.</td>
                            <td>Automation</td>
                        </tr>
                    </table>
                </div>
            </div>
        )
    }
}