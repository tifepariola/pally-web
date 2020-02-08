import React from 'react';
import {Component} from "react";
import Header from '../Header/Header';
import Footer from "../Footer/Footer";
import {Link} from 'react-router-dom'
import './PlanForm.css';
import PlanActions from "../../js/actions/actions";
import Cookie from '../../../utils/cookie';

export default class PlanForm extends Component {
    constructor(props) {
        super(props);
        const {id, plan_type} = this.props.match.params
        this.state = {
            plan: {},
            planId: id,
            planType: plan_type,
        }
    }

    componentWillMount() {

        PlanActions.getPlanDetail(this.state.planType, this.state.planId).subscribe(resp => {
            console.log(resp.data.data)
            var user = Cookie.getUser()
            this.setState({
                user,
                auth_code: JSON.parse(user.auth_code_object),
                plan: resp.data.data,
            })
        })
    }

    render() {
        return (
            <div>

                <Header/>
                <div className="wrapper">
                    <div className="container-fluid">
                        <div className="row py-3">
                            <div className="col-md-2">
                                <Link to={"/dashboard/plan/" + this.state.planType + "/" + this.state.planId}>
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
                                                <input type="text" className="form-control" defaultValue={this.state.plan.custom_name}/>
                                            </div>
                                        </div>
                                        <div className="form-group row my-2">
                                            <label className="col-sm-5 col-form-label py-0">
                                                <h4 className="m-0">Target Amount</h4>
                                                <small>How much are you intending to save in total?</small>
                                            </label>
                                            <div className="col-sm-7">
                                                <input type="text" className="form-control" defaultValue={this.state.plan.amount}/>
                                            </div>
                                        </div>
                                        <div className="form-group row my-2">
                                            <label className="col-sm-5 col-form-label py-0">
                                                <h4 className="m-0">Saving Frequency</h4>
                                                <small>How much and how often do you want to save?</small>
                                            </label>
                                            <div className="col-sm-7">
                                                <input type="text" className="form-control" defaultValue={this.state.plan.saving_amount}/>
                                            </div>
                                        </div>
                                        <div className="form-group row my-2">
                                            <label className="col-sm-5 col-form-label py-0">
                                                <h4 className="m-0">Automation</h4>
                                                <small>Like to save automatically?</small>
                                            </label>
                                            <div className="col-sm-7">
                                                <input type="text" className="form-control"/>
                                            </div>
                                        </div>
                                        <div className="form-group row my-2">
                                            <label className="col-sm-5 col-form-label py-0">
                                                <h4 className="m-0">Maturity Date</h4>
                                                <small>When will you like your saving to end?</small>
                                            </label>
                                            <div className="col-sm-7">
                                                <input type="text" className="form-control" defaultValue={this.state.plan.maturity_date}/>
                                            </div>
                                        </div>
                                        {/*<div className="form-group row my-2">*/}
                                        {/*    <label className="col-sm-5 col-form-label py-0">*/}
                                        {/*        <h4 className="m-0">Debit Card</h4>*/}
                                        {/*        <small>Which card will you like to save from?</small>*/}
                                        {/*    </label>*/}
                                        {/*    <div className="col-sm-7">*/}
                                        {/*        <select style={{ textTransform: 'capitalize' }} name="card" onChange={this.handleChange} className="form-control">*/}
                                        {/*            <option value="new">New Card</option>*/}
                                        {/*            {this.state.auth_code ?*/}
                                        {/*                <option>*/}
                                        {/*                    {this.state.auth_code.brand} - **** {this.state.auth_code.last4}*/}
                                        {/*                </option> : null}*/}
                                        {/*        </select>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                        <button className="btn btn-danger">Delete Plan</button>
                                        <small className="ml-2">Plans can only be deleted when they have zero
                                            balance</small>
                                        <Link to="/dashboard/view" className="btn btn-primary float-right">Save
                                            Plan</Link>
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