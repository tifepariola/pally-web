'use strict';

import React, { Component } from 'react';

export default class Step6 extends Component {
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
                                <h3 className="m-0">How long would you like to save?</h3>
                            </label>
                            <div className="col-sm-7">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1"
                                           value="option1" checked />
                                    <label className="form-check-label" htmlFor="exampleRadios1">
                                        3 months
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2"
                                           value="option2" />
                                    <label className="form-check-label" htmlFor="exampleRadios2">
                                        Choose maturity date
                                    </label>
                                </div>
                                <input type="text" className="form-control mt-2" />
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
        )
    }
}