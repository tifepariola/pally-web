import React, { Component } from "react";
import "./CreatePlan.css";
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

class CreatePlan extends Component {
    componentWillMount() {
        if (!localStorage.getItem("auth")) {
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
            auth: localStorage.getItem("auth"),
        }
    }


    render() {

        return (
            <div>
                <Header />
                <div className="wrapper">
                    <div className="container-fluid">
                        <div className="row py-3">
                            <div className="col-md-2">
                            <Link to="/">
                                <i className="fa fa-arrow-left"></i> Back
                            </Link>
                            </div>
                            <div className="col-md-8 text-center">
                                <div className="page-title-box">
                                    <h2 className="">Create Plan</h2>
                                    <h6>What plan fits your saving needs?</h6>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="col-xl-4 offset-xl-4">
                                <Link to="/dashboard/create-regular-savings">
                                    <div className="card widget-flat bg-primary text-white">
                                        <div className="card-body p-0">
                                            <div className="p-3 pb-0">
                                                <h3>General Savings</h3>
                                                <h6 className="text-white">Save up for a goal or just build up a saving culture. <br />Earn up to 15% p.a. <br /> Make emergency withdrawal.</h6>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-xl-4 offset-xl-4">
                                <Link to="/dashboard/edit">
                                    <div className="card widget-flat bg-primary text-white">
                                        <div className="card-body p-0">
                                            <div className="p-3 pb-0">
                                                <h3>Fixed Deposits</h3>
                                                <h6 className="text-white">Keep funds and earn upfront interest paid into your Jara. <br /> Interest upto 15% p.a</h6>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

CreatePlan.propTypes = {
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
)(withRouter(CreatePlan));
