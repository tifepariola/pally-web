'use strict';

import PropTypes from 'prop-types';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import Joi from 'joi';

import React, { Component } from 'react';

class Step3 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            saving_amount: props.getStore().saving_amount
        };

        this.validatorTypes = {
            saving_amount: Joi.number().required()
        };
        this.getValidatorData = this.getValidatorData.bind(this);
        this.renderHelpText = this.renderHelpText.bind(this);
        this.isValidated = this.isValidated.bind(this);

    }

    componentDidMount() {}

    componentWillUnmount() {}


    isValidated() {
        console.log("jui")
        return new Promise((resolve, reject) => {
            this.props.validate((error) => {
                if (error) {
                    reject(); // form contains errors
                    return;
                }

                console.log("jui")
                if (this.props.getStore().saving_amount != this.getValidatorData().saving_amount) { // only update store of something changed
                    this.props.updateStore({
                        ...this.getValidatorData(),
                    });  // Update store here (this is just an example, in reality you will do it via redux or flux)
                }

                resolve(); // form is valid, fire action
            });

        });
    }

    getValidatorData() {
        console.log(this.refs.saving_amount.value)

        return {
            saving_amount: this.refs.saving_amount.value,
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
        notValidClasses.saving_amountCls = this.props.isValid('saving_amount') ?
            'no-error' : 'has-error';

        return (
            <div className="card">
                <div className="card-body">
                    <fieldset>
                        <div className="form-group row">
                            <label className="col-sm-5 col-form-label py-0">
                                <h3 className="m-0">How much would you like to save {this.props.getStore().automatic_saving === "true" ? this.props.getStore().payment_mode : "for now"}?</h3>
                                <small>This is the amount you intend to save periodically into your plan. Minimum of ₦100 is required.</small>
                            </label>
                            <div className={notValidClasses.saving_amountCls + " col-sm-7"}>
                                <input
                                    ref="saving_amount"
                                    name="saving_amount"
                                    autoComplete="off"
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter savings amount"
                                    required
                                    defaultValue={this.state.saving_amount}
                                    onBlur={this.props.handleValidation('saving_amount')}
                                    onChange={this.onChange.bind(this)}
                                />
                                {this.props.getValidationMessages('saving_amount').map(this.renderHelpText)}

                            </div>

                        </div>
                    </fieldset>
                </div>
            </div>
        )
    }
}

Step3.propTypes = {
    errors: PropTypes.object,
    validate: PropTypes.func,
    isValid: PropTypes.func,
    handleValidation: PropTypes.func,
    getValidationMessages: PropTypes.func,
    clearValidations: PropTypes.func,
    getStore: PropTypes.func,
    updateStore: PropTypes.func
};

export default validation(strategy)(Step3);