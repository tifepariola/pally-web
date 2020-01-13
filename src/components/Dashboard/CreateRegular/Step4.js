'use strict';

import PropTypes from 'prop-types';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import Joi from 'joi';

import React, { Component } from 'react';
import Datetime from "react-datetime";

class Step4 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            maturity_date: props.getStore().maturity_date
        };

        this.validatorTypes = {
            maturity_date: Joi.string().required()
        };
        this.getValidatorData = this.getValidatorData.bind(this);
        this.renderHelpText = this.renderHelpText.bind(this);
        this.isValidated = this.isValidated.bind(this);

    }

    componentDidMount() {}

    componentWillUnmount() {}

    handleMaturityDate(e) {
        console.log(e.target.value)
        let dateSelect = new Date(1578952311*1000)
        console.log(dateSelect.toUTCString())
        this.setState({ maturityDate: dateSelect.toISOString() });
        console.log(this.state.maturityDate)
    };

    isValidated() {
        return new Promise((resolve, reject) => {
            this.props.validate((error) => {
                if (error) {
                    reject(); // form contains errors
                    return;
                }

                if (this.props.getStore().maturity_date != this.getValidatorData().maturity_date) { // only update store of something changed
                    this.props.updateStore({
                        ...this.getValidatorData(),
                        savedToCloud: true // use this to notify step4 that some changes took place and prompt the user to save again
                    });  // Update store here (this is just an example, in reality you will do it via redux or flux)
                }

                resolve(); // form is valid, fire action
            });

        });
    }

    getValidatorData() {
        console.log(this.refs.maturity_date.value)

        return {
            maturity_date: this.refs.maturity_date.value,
        }
    };
    onChange(e) {
        let newState = {};
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    }
    // not required as this component has no forms or user entry
    // isValidated() {}

    renderHelpText(message, id) {
        return (<div className="val-err-tooltip" key={id}><span>{message}</span></div>);
    };
    render() {

        let notValidClasses = {};
        notValidClasses.maturity_dateCls = this.props.isValid('maturity_date') ?
            'no-error' : 'has-error';

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
                                    <input className="form-check-input" type="radio" name="maturity_date" ref="maturity_date"
                                           value={Datetime.moment().add(3, 'month')} onClick={this.handleMaturityDate.bind(this)} />
                                    <label className="form-check-label">
                                        3 months
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="maturity_date" ref="maturity_date"
                                           value={Datetime.moment().add(6, 'month')} onClick={this.handleMaturityDate.bind(this)} />
                                    <label className="form-check-label">
                                        6 months
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="maturity_date" ref="maturity_date"
                                           value="select" onClick={() => this.setState({selectMaturity: true})} />
                                    <label className="form-check-label">
                                        Choose maturity date
                                    </label>
                                </div>
                                { this.state.selectMaturity ?
                                    <input type="text" className="form-control mt-2"/> : null
                                }
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
        )
    }
}

Step4.propTypes = {
    errors: PropTypes.object,
    validate: PropTypes.func,
    isValid: PropTypes.func,
    handleValidation: PropTypes.func,
    getValidationMessages: PropTypes.func,
    clearValidations: PropTypes.func,
    getStore: PropTypes.func,
    updateStore: PropTypes.func
};

export default validation(strategy)(Step4);