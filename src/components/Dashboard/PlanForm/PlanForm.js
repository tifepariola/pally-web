import React from 'react';
import { Component } from "react";
import Header from '../Header/Header';
import Footer from "../Footer/Footer";
import { Link } from 'react-router-dom'
import './PlanForm.css';

export default class PlanForm extends Component {
    render() {
        return (
            <div>

                <Header />
                <div className="wrapper">
                    <div className="container-fluid">
                        <div className="row py-3">
                            <div className="col-md-2">
                                <Link to="/dashboard/create">
                                    <i className="fa fa-arrow-left"></i> Back
                            </Link>
                            </div>
                            <div className="col-md-8 text-center">
                                <div className="page-title-box">
                                    <h2 className="">General Savings</h2>
                                    <h6></h6>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="col-xl-8 offset-xl-2">
                                <div className="card widget-flat">
                                    <div className="card-body">
                                        <div class="form-group row">
                                            <label className="col-sm-5 col-form-label py-0">
                                                <h4 className="m-0">Plan Name</h4>
                                                <small>What name will you like your plan to be called?</small>
                                            </label>
                                            <div className="col-sm-7">
                                                <input type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-5 col-form-label py-0">
                                                <h4 className="m-0">Target Amount</h4>
                                                <small>How much are you intending to save in total?</small>
                                            </label>
                                            <div className="col-sm-7">
                                                <input type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-5 col-form-label py-0">
                                                <h4 className="m-0">Saving Frequency</h4>
                                                <small>How much and how often do you want to save?</small>
                                            </label>
                                            <div className="col-sm-7">
                                                <input type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-5 col-form-label py-0">
                                                <h4 className="m-0">Automation</h4>
                                                <small>Like to save automatically?</small>
                                            </label>
                                            <div className="col-sm-7">
                                                <input type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-5 col-form-label py-0">
                                                <h4 className="m-0">Start Date</h4>
                                                <small>When will you like your saving to start?</small>
                                            </label>
                                            <div className="col-sm-7">
                                                <input type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-5 col-form-label py-0">
                                                <h4 className="m-0">Debit Card</h4>
                                                <small>Which card will you like to save from?</small>
                                            </label>
                                            <div className="col-sm-7">
                                                <input type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <button className="btn btn-danger">Delete Plan</button>
                                        <small className="ml-2">Plans can only be deleted when they have zero balance</small>
                                        <Link to="/dashboard/view" className="btn btn-primary float-right">Save Plan</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}