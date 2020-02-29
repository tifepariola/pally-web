import React, { Component } from "react";
import "./BuyFund.css";
import Header from "../Header/Header";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import history from "../../../history";
import "../../Dashboard/Auth/Login.css";
import { createPlan } from "../../js/actions/planActions";
import { getUser } from "../../js/actions/authActions";
import { getPlans } from "../../js/actions/planActions";
import { Link } from 'react-router-dom'
import PlanActions from "../../js/actions/actions";
import Footer from "../Footer/Footer";
import Datetime from 'react-datetime';
import Cookie from "../../../utils/cookie";
import Modal from "react-bootstrap4-modal";
import SelectListGroup from "../MyPlans/SelectListGroup";

class BuyFund extends Component {
    componentWillMount() {
        if (!Cookie.getAuth()) {
            history.push("/dashboard/login");
        }

        // this.props.getPlans();
        this.props.getUser();
        let plan_list = [];
        PlanActions.getPlans().subscribe(resp => {
            console.log(resp.data)
            resp.data.map((plan) =>
                plan.plans.map((plan_item) => {
                    plan_item.plan_type = plan.type
                    plan_list.push(plan_item)
                })
            );
            this.setState({
                plans: plan_list,
                loading: false
            })
            console.log('hello', this.state.plans)

        })
        // this.setState({ plans: this.props.planContents })
    }

    constructor(props) {
        super(props);

        this.state = {
            show: false,
            open: true,
            auth: Cookie.getAuth(),
        }
    }
    modalBackdropClicked = () => {
        this.setState({
            show: false
        })
    }
    showModal = () => {
        this.setState({
            show: true
        })
    }

    render() {
        const {show, open} = this.state;
        let showModal;

        if (show) {
            showModal = (
                <Modal visible={show} onClickBackdrop={this.modalBackdropClicked}>
                <div className="modal-header">
                <h5 className="modal-title">United Place Fund<br/><small>by United Capital</small></h5>

            <button className={'btn btn-primary btn-sm float-right'}>Start Investing</button>
        </div>
        <div className="modal-body">
            <div className={'card'}>
                <div className={'card-header'}>
                    <h5>Fund Details</h5>
                </div>
                <div className={'card-body'}>
                    <div className={'row'}>
                        <div className={'col-lg-6'}>
                            <h5>Risk Level</h5>
                            <p>Low Risk</p>
                        </div>
                        <div className={'col-lg-6'}>
                            <h5>Annual Return</h5>
                            <p>11%</p>
                        </div>
                        <div className={'col-lg-6'}>
                            <h5>Risk Level</h5>
                            <p>Low Risk</p>
                        </div>
                        <div className={'col-lg-6'}>
                            <h5>Annual Return</h5>
                            <p>11%</p>
                        </div>
                        <div className={'col-lg-6'}>
                            <h5>Risk Level</h5>
                            <p>Low Risk</p>
                        </div>
                        <div className={'col-lg-6'}>
                            <h5>Annual Return</h5>
                            <p>11%</p>
                        </div>
                    </div>
                    <div className={'row'}>
                        <div className={'col-md-6 p-0'}>
                            <h5>About this fund</h5>
                            <small>Lorem ipsum</small>
                        </div>
                        <div className={'col-md-6 p-0'}>
                            <h5>Suitable for</h5>
                            <small>Lorem ipsum</small>
                        </div>
                    </div>
                    <h5>Terms of use</h5>
                    <small>Lorem ipsum</small>
                </div>
            </div>
        </div>
        {/*<div className="modal-footer">*/}
        {/*<button type="button" className="btn btn-secondary" onClick={this.onPanic}>*/}
        {/*Panic*/}
        {/*</button>*/}
        {/*<button type="button" className="btn btn-primary" onClick={this.onFirePhasers}>*/}
        {/*Fire phasers*/}
        {/*</button>*/}
        {/*</div>*/}
        </Modal>
            );
        }

        return (
            <div>
                <Header />
                <div className="wrapper">
                    <div className="container-fluid">
                        <div className="row py-3">
                            <div className="col-md-2">
                            <Link to="/dashboard/funds">
                                <i className="fa fa-arrow-left"></i> Back
                            </Link>
                            </div>
                            <div className="col-md-8 text-center">
                                <div className="page-title-box">
                                    <h2 className="">Buy Mutual Funds</h2>
                                    {/*<h6>What plan fits your saving needs?</h6>*/}
                                </div>
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="col-md-4">
                                <div className="card">
                                    <div className="card-body">
                                        <div className={'text-center'}>
                                            <h2>My Mutual Fund</h2>
                                            <h4><span className="badge badge-primary">United Capital</span></h4>
                                            <button onClick={this.showModal} className={'btn btn-link'}>See Details</button>
                                        </div>
                                        <div className={'row'}>
                                            <div className={'col-lg-6 text-center'}>
                                                <h5>Risk Level</h5>
                                                <p>Low Risk</p>
                                            </div>
                                            <div className={'col-lg-6 text-center'}>
                                                <h5>Annual Return</h5>
                                                <p>11%</p>
                                            </div>
                                        </div>
                                        <div className={'text-center'}>
                                            <Link to={'/dashboard/buy'} className={'btn btn-primary'}>Invest</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card">
                                    <div className="card-body">
                                        <div className={'text-center'}>
                                            <h2>My Mutual Fund</h2>
                                            <h4><span className="badge badge-primary">United Capital</span></h4>
                                            <button onClick={this.showModal} className={'btn btn-link'}>See Details</button>
                                        </div>
                                        <div className={'row'}>
                                            <div className={'col-lg-6 text-center'}>
                                                <h5>Risk Level</h5>
                                                <p>Low Risk</p>
                                            </div>
                                            <div className={'col-lg-6 text-center'}>
                                                <h5>Annual Return</h5>
                                                <p>11%</p>
                                            </div>
                                        </div>
                                        <div className={'text-center'}>
                                            <Link to={'/dashboard/buy'} className={'btn btn-primary'}>Invest</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card">
                                    <div className="card-body">
                                        <div className={'text-center'}>
                                            <h2>My Mutual Fund</h2>
                                            <h4><span className="badge badge-primary">United Capital</span></h4>
                                            <button onClick={this.showModal} className={'btn btn-link'}>See Details</button>
                                        </div>
                                        <div className={'row'}>
                                            <div className={'col-lg-6 text-center'}>
                                                <h5>Risk Level</h5>
                                                <p>Low Risk</p>
                                            </div>
                                            <div className={'col-lg-6 text-center'}>
                                                <h5>Annual Return</h5>
                                                <p>11%</p>
                                            </div>
                                        </div>
                                        <div className={'text-center'}>
                                            <Link to={'/dashboard/buy'} className={'btn btn-primary'}>Invest</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card">
                                    <div className="card-body">
                                        <div className={'text-center'}>
                                            <h2>My Mutual Fund</h2>
                                            <h4><span className="badge badge-primary">United Capital</span></h4>
                                            <button onClick={this.showModal} className={'btn btn-link'}>See Details</button>
                                        </div>
                                        <div className={'row'}>
                                            <div className={'col-lg-6 text-center'}>
                                                <h5>Risk Level</h5>
                                                <p>Low Risk</p>
                                            </div>
                                            <div className={'col-lg-6 text-center'}>
                                                <h5>Annual Return</h5>
                                                <p>11%</p>
                                            </div>
                                        </div>
                                        <div className={'text-center'}>
                                            <Link to={'/dashboard/buy'} className={'btn btn-primary'}>Invest</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {showModal}
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

BuyFund.propTypes = {
    createPlan: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
    getPlans: PropTypes.func.isRequired,
    plan: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    planContent: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    plan: state.plan,
    isAuthenticated: state.isAuthenticated,
    user: state.user
});
export default connect(
    mapStateToProps,
    { createPlan, getUser, getPlans }
)(withRouter(BuyFund));
