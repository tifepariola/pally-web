'use strict';

import PropTypes from 'prop-types';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import Joi from 'joi';

import React, {Component} from 'react';
import Datetime from "react-datetime";

class Step4 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            maturity_date: props.getStore().maturity_date,
            selectMaturity: this.props.getStore().maturity_date !== ''
        };

        this.validatorTypes = {
            maturity_date: Joi.string().required()
        };
        this.getValidatorData = this.getValidatorData.bind(this);
        this.renderHelpText = this.renderHelpText.bind(this);
        this.isValidated = this.isValidated.bind(this);
        this.handleDatePicker = this.handleDatePicker.bind(this);

    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    handleMaturityDate(e) {
        console.log(e.target.value)
        let dateSelect = new Date(parseInt(e.target.value))
        console.log(dateSelect.toUTCString())
        this.setState({maturity_date: dateSelect.toISOString().split("T")[0], selectMaturity: false});
        console.log(this.state.maturity_date)
    };

    handleDatePicker(date) {
        let dteCurrent = Datetime.moment(date._d).add(1, 'day')

        console.log(dteCurrent._d.toUTCString())
        this.setState({maturity_date: dteCurrent._d.toISOString().split("T")[0]});
    };

    isValidated() {
        return new Promise((resolve, reject) => {
            if (this.state.maturity_date === '') {
                reject(); // form contains errors
                return;
            }

            console.log("update o", this.state.maturity_date)
            this.props.updateStore({
                maturity_date: this.state.maturity_date,
            });  // Update store here (this is just an example, in reality you will do it via redux or flux)

            resolve(); // form is valid, fire action

        });
    }

    getValidatorData() {
        console.log(this.refs.maturity_date.props.defaultValue)

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

        var maturityDay = Datetime.moment().add(3, 'month');
        var maturityValid = function (current) {
            return current.isAfter(maturityDay);
        };
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
                                    <input className="form-check-input" type="radio" name="maturityDate"
                                           value={Datetime.moment().add(3, 'month')}
                                           onClick={this.handleMaturityDate.bind(this)}/>
                                    <label className="form-check-label">
                                        3 months
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="maturityDate"
                                           value={Datetime.moment().add(6, 'month')}
                                           onClick={this.handleMaturityDate.bind(this)}/>
                                    <label className="form-check-label">
                                        6 months
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="maturityDate"
                                           defaultChecked={this.props.getStore().maturity_date !== ''}
                                           value="select" onClick={() => this.setState({selectMaturity: true})}/>
                                    <label className="form-check-label">
                                        Choose maturity date
                                    </label>
                                </div>
                                {this.state.selectMaturity ?
                                    <Datetime ref="maturity_date" input={true} timeFormat={false} className={"mt-2"}
                                              defaultValue={this.state.maturity_date} isValidDate={maturityValid}
                                              inputProps={{placeholder: 'Click to select...'}}
                                              onChange={this.handleDatePicker}/>
                                    : null
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