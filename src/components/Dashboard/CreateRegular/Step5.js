'use strict';

import React from 'react';

const Step5 = (props) => (
    <div className="card">
        <div className="card-body">
                <fieldset>
                    <div className="form-group row">
                        <label className="col-sm-5 col-form-label py-0">
                            <h3 className="m-0">When would you like to start saving?</h3>
                            <small>You can modify your saving frequency anytime after creating this plan.</small>
                        </label>
                        <div className="col-sm-7">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1"
                                       value="option1" checked />
                                <label className="form-check-label" htmlFor="exampleRadios1">
                                    I'll start today
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2"
                                       value="option2" />
                                <label className="form-check-label" htmlFor="exampleRadios2">
                                    Choose preferred date
                                </label>
                            </div>
                            <input type="text" className="form-control mt-2" />
                        </div>
                    </div>

                </fieldset>
            </div>
    </div>
)

export default Step5;