'use strict';

import React, { Component } from 'react';

export default class Step4 extends Component {
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
                    <fieldset>
                        <div className="form-group row">
                            <label className="col-sm-5 col-form-label py-0">
                                <h3 className="m-0">How much would you like to save daily?</h3>
                                <small>This is the amount you intend to save periodically into your plan. Minimum of ₦100 is required.</small>
                            </label>
                            <div className="col-sm-7">
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
        )
    }
}