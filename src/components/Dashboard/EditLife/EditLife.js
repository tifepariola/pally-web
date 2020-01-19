import React from 'react';
import {Component} from "react";
import Header from '../Header/Header';
import Footer from "../Footer/Footer";
import {Link} from 'react-router-dom'
import './EditLife.css';
import PlanActions from "../../js/actions/actions";
import Datetime from "react-datetime";

export default class EditLife extends Component {
    constructor(props) {
        super(props);
        const {id, plan_type} = this.props.match.params
        this.state = {
            plan: {},
            planId: id,
            planType: 'lives',
            automatic_saving: true
        }
    }

    handleUpdate = event => {
        event.preventDefault();

        let param = {

                custom_name: this.state.custom_name,
                amount: this.state.amount,
            payment_mode: this.state.payment_mode,
            saving_amount: this.state.saving_amount,
            automatic_saving: this.state.automatic_saving,

        }


        PlanActions.updatePlan("lives", this.state.planId, param).subscribe(resp => {
            let plan = resp.data.data
            console.log(plan)
        })
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
        console.log(this.state[event.target.name])
    };
    componentWillMount() {

        PlanActions.getPlanDetail(this.state.planType, this.state.planId).subscribe(resp => {
            console.log(resp.data.data)
            console.log(resp.data.data.automatic_saving)
            console.log(this.state.automatic_saving)
            this.setState({
                user: JSON.parse(localStorage.getItem('user')),
                auth_code: JSON.parse(JSON.parse(localStorage.getItem('user')).auth_code_object),
                plan: resp.data.data,
                custom_name: resp.data.data.custom_name,
                amount: resp.data.data.amount,
                automatic_saving: resp.data.data.automatic_saving,
                payment_mode: resp.data.data.payment_mode,
                saving_amount: resp.data.data.saving_amount,
            })
            console.log(this.state.automatic_saving)

        })
    }

    render() {

        var maturityDay = this.state.plan === 'fixeds' ? Datetime.moment().add(6, 'month') : Datetime.moment().add(3, 'month');
        var maturityValid = function (current) {
            return current.isAfter(maturityDay);
        };
        return (
            <div>

                <Header/>
                <div className="wrapper">
                    <div className="container-fluid">
                        <div className="row py-3">
                            <div className="col-md-2">
                                <Link to={"/dashboard/plan/lifes/" + this.state.planId}>
                                    <i className="fa fa-arrow-left"></i> Back
                                </Link>
                            </div>
                            <div className="col-md-8 text-center">
                                <div className="page-title-box">
                                    <h2 className="">{this.state.plan.custom_name}</h2>
                                    <h6></h6>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="col-xl-8 offset-xl-2">
                                <div className="card widget-flat">
                                    <div className="card-body">
                                        <div class="form-group row my-2">
                                            <label className="col-sm-5 col-form-label py-0">
                                                <h4 className="m-0">Plan Name</h4>
                                                <small>What name will you like your plan to be called?</small>
                                            </label>
                                            <div className="col-sm-7">
                                                <input type="text" className="form-control" defaultValue={this.state.custom_name} onChange={this.handleChange}/>
                                            </div>
                                        </div>
                                        <div className="form-group row my-2">
                                            <label className="col-sm-5 col-form-label py-0">
                                                <h4 className="m-0">Would you like to automate savings?</h4>
                                                <small>You can modify your automation anytime after creating this plan.</small>
                                            </label>
                                            <div className="col-sm-7">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="automatic_saving" id="yes"
                                                           value={true}
                                                           checked={this.state.automatic_saving == "true" || this.state.automatic_saving == true}
                                                           onChange={this.handleChange}/>
                                                    <label className="form-check-label" htmlFor="yes">
                                                        Yes, I want to be debited automatically
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="automatic_saving" id="no"
                                                           value={false}
                                                           checked={this.state.automatic_saving == "false" || this.state.automatic_saving == false}
                                                           onChange={this.handleChange}/>
                                                    <label className="form-check-label" htmlFor="no">
                                                        No, I want to save when I want to
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        {this.state.automatic_saving == "true" || this.state.automatic_saving == true ? (
                                        <fieldset>
                                            <div className="form-group row my-2">
                                            <label className="col-sm-5 col-form-label py-0">
                                                <h4 className="m-0">How frequently would you like to save?</h4>
                                                <small>You can modify your saving frequency anytime after creating this
                                                    plan.</small>
                                            </label>
                                            <div className="col-sm-7">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="payment_mode"
                                                           checked={this.state.payment_mode === "daily"}
                                                           value="daily" onChange={this.handleChange}/>
                                                    <label className="form-check-label">
                                                        Once a day
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="payment_mode"
                                                           checked={this.state.payment_mode === "weekly"}
                                                           value="weekly" onChange={this.handleChange}/>
                                                    <label className="form-check-label">
                                                        Once a week
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="payment_mode"
                                                           checked={this.state.payment_mode === "monthly"}
                                                           value="monthly" onChange={this.handleChange}/>
                                                    <label className="form-check-label">
                                                        Once a month
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row my-2">
                                            <label className="col-sm-5 col-form-label py-0">
                                                <h4 className="m-0">How much would you like to save {this.state.automatic_saving === "true" ? this.state.payment_mode : "for now"}?</h4>
                                                <small>This is the amount you intend to save periodically into your plan. Minimum of ₦100 is required.</small>
                                            </label>
                                            <div className={"col-sm-7"}>
                                                <input
                                                    ref="saving_amount"
                                                    name="saving_amount"
                                                    autoComplete="off"
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Enter savings amount"
                                                    required
                                                    defaultValue={this.state.saving_amount}
                                                    onChange={this.handleChange}
                                                />

                                            </div>

                                        </div>
                                        </fieldset>) : null }
                                        <div className="form-group row my-2">
                                            <label className="col-sm-5 col-form-label py-0">
                                                <h4 className="m-0">Target Amount</h4>
                                                <small>How much are you intending to save in total?</small>
                                            </label>
                                            <div className="col-sm-7">
                                                <input type="text" className="form-control" defaultValue={this.state.amount} onChange={this.handleChange}/>
                                            </div>
                                        </div>
                                        <button className="btn btn-danger">Delete Plan</button>
                                        <small className="ml-2">Plans can only be deleted when they have zero
                                            balance</small>
                                        <button onClick={this.handleUpdate} className="btn btn-primary float-right">Update
                                            Plan</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}
