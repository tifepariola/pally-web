'use strict';

import React from 'react';

const Step2 = (props) => (
    <div className="card">
        <div className="card-body">
            <fieldset>
                <div className="form-group row">
                    <label className="col-sm-5 col-form-label py-0">
                        <h3 className="m-0">Would you like to automate savings?</h3>
                        <small>You can modify your automation anytime after creating this plan.</small>
                    </label>
                    <div className="col-sm-7">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1"
                                   value="option1" checked />
                            <label className="form-check-label" htmlFor="exampleRadios1">
                                Yes, I want to be debited automatically
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2"
                                   value="option2" />
                            <label className="form-check-label" htmlFor="exampleRadios2">
                                No, I want to save when I want to
                            </label>
                        </div>
                    </div>
                </div>
            </fieldset>
        </div>
    </div>
)

export default Step2;