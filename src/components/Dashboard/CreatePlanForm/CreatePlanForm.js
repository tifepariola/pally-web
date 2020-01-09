import React, { Component } from "react";
import "./CreatePlanForm.css";
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
import ReactWizard from 'react-bootstrap-wizard';

class FirstStep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstStep: "first step here"
        };
    }
    render() {
        return <fieldset>
            <div className="form-group row">
                <label className="col-sm-5 col-form-label py-0">
                    <h3 className="m-0">What will you call this plan?</h3>
                    <small>Examples: My house, Masters at UCLA</small>
                </label>
                <div className="col-sm-7">
                    <input type="text" className="form-control" />
                </div>
            </div>
        </fieldset>;
    }
}
class SecondStep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            secondStep: "second step here"
        };
    }
    isValidated() {
        // do some validations
        // decide if you will
        return true;
        // or you will
        // return false;
    }
    render() {
        return <fieldset>
            <div className="form-group row">
                <label className="col-sm-5 col-form-label py-0">
                    <h3 className="m-0">Would you like to automate savings?</h3>
                    <small>You can modify your automation anytime after creating this plan.</small>
                </label>
                <div className="col-sm-7">
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1"
                               value="option1" checked />
                        <label className="form-check-label" htmlFor="exampleRadios1">
                            Yes, I want to be debited automatically
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2"
                               value="option2" />
                        <label className="form-check-label" htmlFor="exampleRadios2">
                            No, I want to save when I want to
                        </label>
                    </div>
                </div>
            </div>
        </fieldset>;
    }
}
class ThirdStep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            thirdStep: "third step here"
        };
    }
    render() {
        return <fieldset>
            <div className="form-group row">
                <label className="col-sm-5 col-form-label py-0">
                    <h3 className="m-0">How frequently would you like to save?</h3>
                    <small>You can modify your saving frequency anytime after creating this plan.</small>
                </label>
                <div className="col-sm-7">
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1"
                               value="option1" checked />
                        <label className="form-check-label" htmlFor="exampleRadios1">
                            Once a day
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2"
                               value="option2" />
                        <label className="form-check-label" htmlFor="exampleRadios2">
                            Once a week
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2"
                               value="option2" />
                        <label className="form-check-label" htmlFor="exampleRadios2">
                            Once a month
                        </label>
                    </div>
                </div>
            </div>
        </fieldset>;
    }
}
class FourthStep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            thirdStep: "third step here"
        };
    }
    render() {
        return <fieldset>
            <div className="form-group row">
                <label className="col-sm-5 col-form-label py-0">
                    <h3 className="m-0">How much would you like to save daily?</h3>
                    <small>This is the amount you intend to save periodically into your plan. Minimum of ₦100 is required.</small>
                </label>
                <div className="col-sm-7">
                    <input type="text" className="form-control" />
                </div>
            </div>
        </fieldset>;
    }
}
class FifthStep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            thirdStep: "third step here"
        };
    }
    render() {
        return <fieldset>
            <div className="form-group row">
                <label className="col-sm-5 col-form-label py-0">
                    <h3 className="m-0">When would you like to start saving?</h3>
                    <small>You can modify your saving frequency anytime after creating this plan.</small>
                </label>
                <div className="col-sm-7">
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1"
                               value="option1" checked />
                        <label className="form-check-label" htmlFor="exampleRadios1">
                            I'll start today
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2"
                               value="option2" />
                        <label className="form-check-label" htmlFor="exampleRadios2">
                            Choose preferred date
                        </label>
                    </div>
                    <input type="text" className="form-control mt-2" />
                </div>
            </div>
        </fieldset>;
    }
}
class SixthStep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            thirdStep: "third step here"
        };
    }
    render() {
        return <fieldset>
            <div className="form-group row">
                <label className="col-sm-5 col-form-label py-0">
                    <h3 className="m-0">How long would you like to save?</h3>
                </label>
                <div className="col-sm-7">
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1"
                               value="option1" checked />
                        <label className="form-check-label" htmlFor="exampleRadios1">
                            3 months
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2"
                               value="option2" />
                        <label className="form-check-label" htmlFor="exampleRadios2">
                            Choose maturity date
                        </label>
                    </div>
                    <input type="text" className="form-control mt-2" />
                </div>
            </div>
        </fieldset>;
    }
}
class SeventhStep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            thirdStep: "third step here"
        };
    }
    render() {
        return <div className="card">
            <div className="card-body">
                Plan Name:
                <table className="table">
                    <tr>
                        <td>
                            <label>Amount</label>
                            <input type="text" className="form-control-plaintext" value="20,000" disabled />
                        </td>
                        <td>Frequency</td>
                    </tr>
                    <tr>
                        <td>Start Date</td>
                        <td>Maturity</td>
                    </tr>
                    <tr>
                        <td>Interest rate p.a.</td>
                        <td>Automation</td>
                    </tr>
                </table>
            </div>
        </div>;
    }
}

var steps = [
    // this step hasn't got a isValidated() function, so it will be considered to be true
    { stepName: "1", component: FirstStep },
    // this step will be validated to false
    { stepName: "2", component: SecondStep },
    // this step will never be reachable because of the seconds isValidated() steps function that will always return false
    { stepName: "3", component: ThirdStep },
    { stepName: "4", component: FourthStep },
    { stepName: "5", component: FifthStep },
    { stepName: "6", component: SixthStep },
    { stepName: "7", component: SeventhStep },
];
class CreatePlanForm extends Component {
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
                            <div className="col-xl-6 offset-xl-3">
                                <ReactWizard
                                    steps={steps}
                                    nextButtonText="Continue"
                                    title=""
                                    navSteps
                                    headerTextCenter
                                    validate
                                    color="primary"
                                    finishButtonClick={this.finishButtonClick}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

CreatePlanForm.propTypes = {
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
)(withRouter(CreatePlanForm));
