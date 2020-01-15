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
        }
    }

    componentWillMount() {

        PlanActions.getPlanDetail(this.state.planType, this.state.planId).subscribe(resp => {
            console.log(resp.data.data)
            this.setState({
                user: JSON.parse(localStorage.getItem('user')),
                auth_code: JSON.parse(JSON.parse(localStorage.getItem('user')).auth_code_object),
                plan: resp.data.data,
            })
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
                                <Link to={"/dashboard/plan/fixeds/" + this.state.planId}>
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
                                                <h4 className="m-0">Maturity Date</h4>
                                                <small>When will you like your saving to end?</small>
                                            </label>
                                            <div className="col-sm-7">
                                                {
                                                    this.state.plan.maturity_date ?
                                                        <Datetime input={true} timeFormat={false} defaultValue={this.state.plan.maturity_date.split(" ")[0]} viewDate={new Date(this.state.plan.maturity_date)} isValidDate={maturityValid} inputProps={{ placeholder: 'Click to select...' }} onChange={this.handleMaturityDate} />
: null
                                                }

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