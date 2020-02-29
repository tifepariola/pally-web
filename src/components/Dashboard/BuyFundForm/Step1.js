'use strict';

import PropTypes from 'prop-types';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import Joi from 'joi';

import React, { Component } from 'react';

class Step1 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            custom_name: props.getStore().custom_name
        };

        this.validatorTypes = {
            custom_name: Joi.string().required()
        };
        this.getValidatorData = this.getValidatorData.bind(this);
        this.renderHelpText = this.renderHelpText.bind(this);
        this.isValidated = this.isValidated.bind(this);

    }

    componentDidMount() {}

    componentWillUnmount() {}


    isValidated() {
        return new Promise((resolve, reject) => {
            this.props.validate((error) => {
                if (error) {
                    reject(); // form contains errors
                    return;
                }

                if (this.props.getStore().custom_name != this.getValidatorData().custom_name) { // only update store of something changed
                    this.props.updateStore({
                        ...this.getValidatorData(),
                    });  // Update store here (this is just an example, in reality you will do it via redux or flux)
                }

                resolve(); // form is valid, fire action
            });

        });
    }

    getValidatorData() {
        console.log(this.refs.custom_name.value)

        return {
            custom_name: this.refs.custom_name.value,
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
        notValidClasses.custom_nameCls = this.props.isValid('custom_name') ?
            'no-error' : 'has-error';

        return (
            <div className="card">
                <div className="card-body">
                    <fieldset>
                        <div className="form-group row">
                            <label className="col-sm-5 col-form-label py-0">
                                <h3 className="m-0">What will you call this investment?</h3>
                                <small>Examples: My house, Masters at UCLA</small>
                            </label>
                            <div className={notValidClasses.custom_nameCls + " col-sm-7"}>
                                <input
                                    ref="custom_name"
                                    name="custom_name"
                                    autoComplete="off"
                                    type="text"
                                    className="form-control"
                                    placeholder="Baecation 2020"
                                    required
                                    defaultValue={this.state.custom_name}
                                    onBlur={this.props.handleValidation('custom_name')}
                                    onChange={this.onChange.bind(this)}
                                />
                                {this.props.getValidationMessages('custom_name').map(this.renderHelpText)}

                            </div>

                        </div>
                    </fieldset>
                </div>
            </div>
        )
    }
}

Step1.propTypes = {
    errors: PropTypes.object,
    validate: PropTypes.func,
    isValid: PropTypes.func,
    handleValidation: PropTypes.func,
    getValidationMessages: PropTypes.func,
    clearValidations: PropTypes.func,
    getStore: PropTypes.func,
    updateStore: PropTypes.func
};

export default validation(strategy)(Step1);
