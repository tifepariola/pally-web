import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import DetailCard from '../../DetailCard';

class Challenge extends Component {

    render () {
        return (
          <div>
            <Header />
            <div className="wrapper">
                <div className="container-fluid">
                    <div className="row">
                    <div className="col-12">
                        <div className="page-title-box">
                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                            <li className="breadcrumb-item">
                                <a href="/">OnePally</a>
                            </li>
                            <li className="breadcrumb-item active">Challenge</li>
                            </ol>
                        </div>
                        <h4 className="page-title">Challenge</h4>
                        </div>
                    </div>
                    </div>
                    <div className="mb-3 ml-2">
                        <Link to={"/dashboard/create-challenge"} className="btn btn-primary mr-2">Create Challenge</Link>
                        <Link to={"/dashboard/join-challenge"} className="btn btn-primary">Join Challenge</Link>
                    </div>

                    <div className="row">
                        <div className="col-sm-12 col-md-4 col-lg-4">
                            <div className="bg-white p-2 text-center">
                                <DetailCard title="Saved Amount" value="201,000.00" />
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-4 col-lg-4">
                            <div className="bg-white p-2 text-center">
                                <DetailCard title="Interests" value="47.12" />
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-4 col-lg-4">
                            <div className="bg-white p-2 text-center">
                                <DetailCard title="Interest per Annum" value="10&#37;" />
                            </div>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-sm-12 col-lg-6 bg-white p-3">
                            <div className="row mb-3">
                                <div className="col-6">
                                    <Link to="#">
                                        <i className="fi fi-save"></i>
                                        <h5>Save Now</h5>
                                    </Link>
                                </div>
                                <div className="col-6">
                                    <Link to="#">
                                        <i className="fi fi-save"></i>
                                        <h5>Leaderboard</h5>
                                    </Link>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-6">
                                    <Link to="#">
                                        <i className="fi fi-save"></i>
                                        <h5>Edit Plan</h5>
                                    </Link>
                                </div>
                                <div className="col-6">
                                    <Link to="#">
                                        <i className="fi fi-save"></i>
                                        <h5>Withdraw</h5>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-12 col-lg-6">
                            <div className="bg-white p-3">
                                <div className="row">
                                    <div className="col-sm-12 col-lg-6">
                                        Amount Saved
                                    </div>
                                    <div className="col-sm-12 col-lg-6">
                                        Target Amount
                                    </div>
                                </div>

                                <div>
                                    <h5>You have reached 25% of your target</h5>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-sm-12 col-md-6">
                            <div className="bg-white p-3">
                                <h5>Plan Details</h5>
                            </div>
                        </div>

                        <div className="col-sm-12 col-md-6">
                            <div className="bg-white p-3">
                                <h5>Transactions</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
          </div>  
        );
    }
}

export default Challenge;
