import React, { Component } from "react";
import "./CreateRegular.css";
import Header from "../Header/Header";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "../../Dashboard/Auth/Login.css";
import { createPlan } from "../../js/actions/planActions";
import { getUser } from "../../js/actions/authActions";
import { getPlans } from "../../js/actions/planActions";
import { Link } from 'react-router-dom'
import Footer from "../Footer/Footer";
import StepZilla from "react-stepzilla";
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';
import Step7 from './Step7';
import Step8 from './Step8';
import PlanActions from "../../js/actions/actions";

class CreateRegular extends Component {

    constructor(props) {
        super(props);

        this.state = {
            auth: localStorage.getItem("auth"),
        }
        this.sampleStore = {
            amount: 100,
            custom_name: '',
            automatic_saving: "true",
            payment_mode: "daily",
            type: "private",
            saving_amount: 100,
            maturity_date: ''
        };
        this.handleNext = this.handleNext.bind(this);

    }
    handleNext() {
        console.log(this.sampleStore)
    }
    handleFinished() {
        let plansData = {
            // plan: this.state.plan,
            custom_name: this.state.custom_name,
            amount: this.state.amount,
            type: this.state.plan,
            payment_mode: this.state.payment_mode,
            maturity_date: this.state.maturityDate
        };
        PlanActions.createPlan(plansData, "savers").subscribe(resp => {
            let plan = resp.data.data
            console.log(plan)

            // window.location = "/dashboard/plans"
        })
    }
    getStore() {
        return this.sampleStore;
    }

    updateStore(update) {
        this.sampleStore = {
            ...this.sampleStore,
            ...update,
        }
    }

    render() {

        const steps =
            [
                {name: '1', component: <Step1 getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
                {name: '2', component: <Step2 getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
                {name: '3', component: <Step3 getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
                {name: '4', component: <Step4 getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
                {name: '5', component: <Step5 getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
                // {name: '6', component: <Step6 getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
                {name: '7', component: <Step7 getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
                {name: '8', component: <Step8 getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />}
            ]
        return (
            <div>
                <Header />
                <div className="wrapper">
                    <div className="container-fluid">
                        <div className="row pt-3">
                            <div className="col-md-2">
                            <Link to="/">
                                <i className="fa fa-arrow-left"></i> Back
                            </Link>
                            </div>
                            <div className="col-md-8 text-center">
                                <div className="page-title-box">
                                    <h2 className="">Create General Savings</h2>
                                    {/*<h6>What plan fits your saving needs?</h6>*/}
                                </div>
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="col-xl-8 offset-xl-2 mb-4">
                                    <div className="step-progress">
                                        <StepZilla
                                            steps={steps}
                                            preventEnterSubmission={true}
                                            prevBtnOnLastStep={false}
                                            nextButtonText={"Continue"}
                                            nextTextOnFinalActionStep={"Finish"}
                                            backButtonText={"Back"}
                                            hocValidationAppliedTo={[0,1,2,3,4]}
                                            // startAtStep={5}
                                            backButtonCls={"btn btn-primary float-left"}
                                            nextButtonCls={"btn btn-primary float-right"}

                                        />
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

CreateRegular.propTypes = {
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
)(withRouter(CreateRegular));
