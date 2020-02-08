'use strict';

import PropTypes from 'prop-types';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import Joi from 'joi';

import React, { Component } from 'react';

class Step5 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            amount: props.getStore().amount
        };

        this.validatorTypes = {
            amount: Joi.number().required()
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
                if (this.props.getStore().amount != this.getValidatorData().amount) { // only update store of something changed
                    this.props.updateStore({
                        ...this.getValidatorData(),
                    });  // Update store here (this is just an example, in reality you will do it via redux or flux)
                }

                resolve(); // form is valid, fire action
            });

        });
    }

    getValidatorData() {
        console.log(this.refs.amount.value)

        return {
            amount: this.refs.amount.value,
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
        notValidClasses.amountCls = this.props.isValid('amount') ?
            'no-error' : 'has-error';

        return (
            <div className="card">
                <div className="card-body">
                    <fieldset>
                        <div className="form-group row">
                            <label className="col-sm-5 col-form-label py-0">
                                <h3 className="m-0">How much would you like to have saved by {this.props.getStore().maturity_date}?</h3>
                                <small>This is the target amount you intend to have saved.</small>
                            </label>
                            <div className={notValidClasses.amountCls + " col-sm-7"}>
                                <input
                                    ref="amount"
                                    name="amount"
                                    autoComplete="off"
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter target amount"
                                    required
                                    defaultValue={this.state.amount}
                                    onBlur={this.props.handleValidation('amount')}
                                    onChange={this.onChange.bind(this)}
                                />
                                {this.props.getValidationMessages('amount').map(this.renderHelpText)}

                            </div>

                        </div>
                    </fieldset>
                </div>
            </div>
        )
    }
}

Step5.propTypes = {
    errors: PropTypes.object,
    validate: PropTypes.func,
    isValid: PropTypes.func,
    handleValidation: PropTypes.func,
    getValidationMessages: PropTypes.func,
    clearValidations: PropTypes.func,
    getStore: PropTypes.func,
    updateStore: PropTypes.func
};

export default validation(strategy)(Step5);