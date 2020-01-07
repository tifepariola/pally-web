import React from 'react';
import { Component } from "react";
import Header from '../Header/Header';
import Footer from "../Footer/Footer";
import { Link } from 'react-router-dom'
import './ViewPlan.css';

export default class ViewPlan extends Component {
    render() {
        return (
            <div>

                <Header />
                <div className="wrapper">
                    <div className="container-fluid">
                        <div className="row py-3">
                            <div className="col-md-2">
                                <Link to="/dashboard/plans">
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

                        <div className="card widget-flat text-center mx-auto" style={{ width: 'fit-content' }}>
                            <div className="card-body">
                                <div className="p-1 pb-0 mx-3 float-left">
                                    <Link to="/">
                                        <i className="fa fa-wallet fa-3x mb-2"></i>
                                        <h5 className="text-muted font-weight-normal mt-0">Save Now</h5>
                                    </Link>
                                </div>
                                <div className="p-1 pb-0 mx-3 float-left">
                                    <Link to="/dashboard/edit">
                                        <i className="fa fa-edit fa-3x mb-2"></i>
                                        <h5 className="text-muted font-weight-normal mt-0">Edit Plan</h5>
                                    </Link>
                                </div>
                                <div className="p-1 pb-0 mx-3 float-left">
                                    <Link to="/">
                                        <i className="fa fa-ambulance fa-3x mb-2"></i>
                                        <h5 className="text-muted font-weight-normal mt-0">Emergency Withdraw</h5>
                                    </Link>
                                </div>
                                <div className="p-1 pb-0 mx-3 float-left">
                                    <Link to="/">
                                        <i className="fa fa-money fa-3x mb-2"></i>
                                        <h5 className="text-muted font-weight-normal mt-0">Withdraw</h5>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="col-12">
                                <div className="card widget-flat">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-4 text-center">
                                                <div className="p-3 pb-0">
                                                    <h5 className="text-muted font-weight-normal mt-0">Fixed Amount</h5>
                                                    <h3 className="mt-2">&#8358;0</h3>
                                                </div>
                                            </div>
                                            <div className="col-md-4 text-center">
                                                <div className="p-3 pb-0">
                                                    <h5 className="text-muted font-weight-normal mt-0">Returns</h5>
                                                    <h3 className="mt-2">&#8358;0</h3>
                                                </div>
                                            </div>
                                            <div className="col-md-4 text-center">
                                                <div className="p-3 pb-0">
                                                    <h5 className="text-muted font-weight-normal mt-0">Interest Per Annum</h5>
                                                    <h3 className="mt-2">10%</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">

                            {/* <div className="col-xl-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="header-title">Savings Chart</h4>
                                        <Doughnut data={data} height={350} className="mt-4" />


                                    </div>
                                </div>
                            </div> */}
                            <div className="col-xl-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="header-title">Plan Details</h4>

                                        <div className="table-responsive mt-3">
                                            <table className="table table-striped">
                                                <tr>
                                                    <td>
                                                        Progress
                                                        <div class="progress">
                                                            <div class="progress-bar" role="progressbar" style={{ width: 10 + '%' }} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Start Date</td>
                                                </tr>
                                                <tr>
                                                    <td>Maturity Date</td>
                                                </tr>
                                                <tr>
                                                    <td>Debit Card</td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-8">
                                <div className="row">
                                    <div className="col-xl-12">
                                        <div className="card widget-flat">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-6 text-center">
                                                        <div className="p-3 pb-0">
                                                            <h5 className="text-muted font-weight-normal mt-0">Amount Saved</h5>
                                                            <h3 className="mt-2">&#8358;0</h3>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 text-center">
                                                        <div className="p-3 pb-0">
                                                            <h5 className="text-muted font-weight-normal mt-0">Target Amount</h5>
                                                            <h3 className="mt-2">&#8358;0</h3>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 offset-md-3 text-center">
                                                        <div class="progress">
                                                            <div class="progress-bar" role="progressbar" style={{ width: 10 + '%' }} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                        <small>You have reached a 10% of your target.</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <h4 className="header-title">Transactions</h4>

                                                <div className="table-responsive mt-3">
                                                    <table className="table">
                                                       
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
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