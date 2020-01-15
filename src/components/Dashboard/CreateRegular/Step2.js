'use strict';

import React, {Component} from 'react';
import Joi from "joi";
import PropTypes from "prop-types";
import validation from "react-validation-mixin";
import strategy from "joi-validation-strategy";
import PaystackButton from "react-paystack";
import PlanActions from "../../js/actions/actions";

class Step2 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: JSON.parse(localStorage.getItem('user')),
            automatic_saving: props.getStore().automatic_saving,
            payment_mode: props.getStore().payment_mode
        };

        this.validatorTypes = {
            automatic_saving: Joi.bool().required()
        };
        this.getValidatorData = this.getValidatorData.bind(this);
        this.renderHelpText = this.renderHelpText.bind(this);
        this.isValidated = this.isValidated.bind(this);

    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }


    getReference = () => {
        //you can put any unique reference implementation code here
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

        for (let i = 0; i < 15; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    isValidated() {
        console.log("ceke")
        return new Promise((resolve, reject) => {
            this.props.validate((error) => {
                if (error) {
                    reject(); // form contains errors
                    return;
                }

                console.log("ceke", this.state.automatic_saving)
                this.props.updateStore({
                    automatic_saving: this.state.automatic_saving,
                    payment_mode: this.state.payment_mode,
                });  // Update store here (this is just an example, in reality you will do it via redux or flux)

                resolve(); // form is valid, fire action
            });

        });
    }

    getValidatorData() {
        console.log(this.refs.automatic_saving.value)
        return {
            automatic_saving: this.refs.automatic_saving.value,
        }
    };

    onChange(e) {
        let newState = {};
        newState[e.target.name] = e.target.value;
        this.setState(newState);
        console.log(newState)
    }

    // callback = event => {
    //     console.log(event)
    //     if (event.status === "success") {
    //
    //         let params = {
    //             trxref: event.trxref,
    //             reference: event.reference,
    //             type: 'jara',
    //             plan_id: this.state.user.jara.id
    //         }
    //         PlanActions.saveNow(params).subscribe(resp => {
    //             console.log(resp.data.data.authorization)
    //             this.setState({
    //                 auth_code: resp.data.data.authorization
    //             })
    //         })
    //         console.log(this.state.savePlan)
    //     }
    // }
    // close = event => {
    //
    //     console.log(event)
    // }

    // not required as this component has no forms or user entry
    // isValidated() {}

    renderHelpText(message, id) {
        return (<div className="val-err-tooltip" key={id}><span>{message}</span></div>);
    };

    render() {

        let notValidClasses = {};
        notValidClasses.automatic_savingCls = this.props.isValid('automatic_saving') ?
            'no-error' : 'has-error';

        return (
            <div className="card">
                <div className="card-body">
                    <fieldset>
                        <div className="form-group row mb-3">
                            <label className="col-sm-5 col-form-label py-0">
                                <h3 className="m-0">Would you like to automate savings?</h3>
                                <small>You can modify your automation anytime after creating this plan.</small>
                            </label>
                            <div className="col-sm-7">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="automatic_saving" id="yes"
                                           ref="automatic_saving"
                                           value={true}
                                           defaultChecked={this.props.getStore().automatic_saving === "true"}
                                           onClick={this.onChange.bind(this)}/>
                                    <label className="form-check-label" htmlFor="yes">
                                        Yes, I want to be debited automatically
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="automatic_saving" id="no"
                                           ref="automatic_saving"
                                           value={false}
                                           defaultChecked={this.props.getStore().automatic_saving === "false"}
                                           onClick={this.onChange.bind(this)}/>
                                    <label className="form-check-label" htmlFor="no">
                                        No, I want to save when I want to
                                    </label>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    {this.state.automatic_saving === "true" ? (
                        <fieldset>
                            <div className="form-group row">
                                <label className="col-sm-5 col-form-label py-0">
                                    <h3 className="m-0">How frequently would you like to save?</h3>
                                    <small>You can modify your saving frequency anytime after creating this
                                        plan.</small>
                                </label>
                                <div className="col-sm-7">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="payment_mode"
                                               ref="payment_mode"
                                               defaultChecked={this.props.getStore().payment_mode === "daily"}
                                               value="daily" onClick={this.onChange.bind(this)}/>
                                        <label className="form-check-label">
                                            Once a day
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="payment_mode"
                                               ref="payment_mode"
                                               defaultChecked={this.props.getStore().payment_mode === "weekly"}
                                               value="weekly" onClick={this.onChange.bind(this)}/>
                                        <label className="form-check-label">
                                            Once a week
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="payment_mode"
                                               ref="payment_mode"
                                               defaultChecked={this.props.getStore().payment_mode === "monthly"}
                                               value="monthly" onClick={this.onChange.bind(this)}/>
                                        <label className="form-check-label">
                                            Once a month
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {/*<div className="form-group row">*/}
                            {/*    <label className="col-sm-5 col-form-label py-0">*/}
                            {/*        <h3 className="m-0">How will you like to pay?</h3>*/}
                            {/*        <small>Select a card to pay with.</small>*/}
                            {/*    </label>*/}
                            {/*    <div className="col-sm-7">*/}
                            {/*        <select style={{textTransform: 'capitalize'}} name="card"*/}
                            {/*                onChange={this.handleChange} className="form-control">*/}
                            {/*            <option value="new">New Card</option>*/}
                            {/*            {this.state.auth_code ?*/}
                            {/*                <option>*/}
                            {/*                    {this.state.auth_code.brand} - **** {this.state.auth_code.last4}*/}
                            {/*                </option> : null}*/}
                            {/*        </select>*/}
                            {/*        <PaystackButton*/}
                            {/*            text={"Save 100 NGN"}*/}
                            {/*            class="btn btn-primary btn-block"*/}
                            {/*            callback={this.callback}*/}
                            {/*            close={this.close}*/}
                            {/*            embed={false}*/}
                            {/*            reference={this.getReference()}*/}
                            {/*            email={this.state.user.email}*/}
                            {/*            amount={10000}*/}
                            {/*            paystackkey={this.state.key}*/}
                            {/*            tag="button"*/}
                            {/*        />*/}
                            {/*    </div>*/}
                            {/*</div>*/}

                        </fieldset>) : null
                    }
                </div>
            </div>
        )
    }
}

Step2.propTypes = {
    errors: PropTypes.object,
    validate: PropTypes.func,
    isValid: PropTypes.func,
    handleValidation: PropTypes.func,
    getValidationMessages: PropTypes.func,
    clearValidations: PropTypes.func,
    getStore: PropTypes.func,
    updateStore: PropTypes.func
};

export default validation(strategy)(Step2);