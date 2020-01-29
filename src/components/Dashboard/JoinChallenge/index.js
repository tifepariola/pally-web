import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import DetailCard from '../../DetailCard'
import './JoinChallenge.css';

class JoinChallenge extends Component {
    constructor (props) {
        super(props);
        this.state = {
            /**
             * Show either the instructions or details
             * 0: Show Challenge instructions
             * 1: Show Challenge details
             */
            instructionsOrDetails: 0
        };
        this.showChallengeDetails = this.showChallengeDetails.bind(this);
        this.joinChallenge = this.joinChallenge.bind(this);
    }

    showChallengeDetails () {
        this.setState({
            instructionsOrDetails: 1
        });
    }

    joinChallenge () {
        console.log('Joining challenge ...');
    }

    render () {
        return  (
            <div>
                <Header />
                <div className="wrapper">
                    <div className="container-fluid">
                        <div className="row py-3">
                            <div className="col-md-2">
                            <Link to="/dashboard/challenge">
                                <i className="fa fa-arrow-left"></i> Back
                            </Link>
                            </div>

                            {
                                this.state.instructionsOrDetails === 0 ?
                                (
                                    <div className="col-md-8 text-center mt-3">
                                        <div className="page-title-box">
                                            <h2 className="mb-3">Join A Public Challenge</h2>
                                            <p className="join-challenge-instructions">
                                                This is a free Savers challenge. Each user is expected to have
                                                saved a sum of &#8358;500,000 by Oct. 20, 2020. You will earn
                                                up to 10&#37; per annum and interest would be paid daily.
                                            </p>
                                            <p  className="join-challenge-instructions">
                                                NO ONE HAS ACCESS TO YOUR MONEY, YOU WILL GET YOUR
                                                FUNDS OCT. 20, 2022.
                                            </p>
                                            <button 
                                                className="btn btn-primary btn-md mt-3"
                                                onClick={this.showChallengeDetails}>
                                                JOIN THE CHALLENGE
                                            </button>
                                        </div>
                                    </div>
                                )
                                :
                                (
                                    <div className="col-md-8 text-center mt-3">
                                        <div className="page-title-box challenge-details">
                                            <h2 className="mb-3">Challenge Details</h2>
                                            <div>
                                                <div className="row text-left">
                                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 mb-2">
                                                        <p className="mb-0">Challenge Name</p>
                                                        <h5 className="mb-2 mt-0 mx-0">2021 Billionaires</h5>
                                                    </div>
                                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 mb-2">
                                                        <p className="mb-0">Start Date</p>
                                                        <h5 className="mb-2 mt-0 mx-0">Jan 01, 2020</h5>
                                                    </div>
                                                </div>

                                                <div className="row text-left">
                                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 mb-2">
                                                        <p className="mb-0">Challenge Target</p>
                                                        <h5 className="mb-2 mt-0 mx-0">&#8358;200,000</h5>
                                                    </div>
                                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 mb-2">
                                                        <p className="mb-0">Withdrawal Date</p>
                                                        <h5 className="mb-2 mt-0 mx-0">Dec 20, 2020</h5>
                                                    </div>
                                                </div>

                                                <div className="row text-left">
                                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 mb-2">
                                                        <p className="mb-0">Frequency</p>
                                                        <h5 className="mb-2 mt-0 mx-0">1000/daily</h5>
                                                    </div>
                                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 mb-2">
                                                        <p className="mb-0">Days left</p>
                                                        <h5 className="mb-2 mt-0 mx-0">231 days</h5>
                                                    </div>
                                                </div>

                                                <div className="row text-left">
                                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 mb-2">
                                                        <p className="mb-0">Interest PA</p>
                                                        <h5 className="mb-2 mt-0 mx-0">10&#37;</h5>
                                                    </div>
                                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 mb-2">
                                                        <p className="mb-0">Number of members presently</p>
                                                        <h5 className="mb-2 mt-0 mx-0">24</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="btn btn-primary btn-md my-3" onClick={this.joinChallenge}>
                                                JOIN CHALLENGE
                                            </button>
                                            <div>
                                                <Link to="">Set your Savings Preference</Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default JoinChallenge;
