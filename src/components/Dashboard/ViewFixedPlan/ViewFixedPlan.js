import React, {Component} from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {Link} from 'react-router-dom'
import Modal from "react-responsive-modal";
import Datetime from 'react-datetime';
import PlanActions from "../../js/actions/actions";
import {getPlanDetail} from "../../js/actions/planActions";

class ViewFixedPlan extends Component {

    constructor(props) {
        super(props);
        const {id} = this.props.match.params

        this.state = {
            user: JSON.parse(localStorage.getItem('user')),
            open: false,
            show: false,
            plan: {
                transactions: []
            },
            payment_mode: "",
            planId: id,
            planType: 'fixeds',
            txs: []
        };
    }

    componentWillMount() {
        PlanActions.getPlanDetail(this.state.planType, this.state.planId).subscribe(resp => {
            console.log(resp.data.data)
            this.setState({
                plan: resp.data.data,
                interest: this.state.plan.current_balance_with_interest - this.state.plan.current_balance
            })
        })
        PlanActions.getPlanTx(this.state.planId).subscribe(resp => {
            console.log('tx', resp.data.data)
            // resp.data.map((plan) =>
            //   plan.plans.map((plan_item) => {
            //     plan_item.plan_type = plan.type
            //     plan_list.push(plan_item)
            //   })
            // );

        })
    }

    formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
        try {
            decimalCount = Math.abs(decimalCount);
            decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

            const negativeSign = amount < 0 ? "-" : "";

            let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
            let j = (i.length > 3) ? i.length % 3 : 0;

            return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
        } catch (e) {
            console.log(e)
        }
    }

    handleSubmit = event => {
        event.preventDefault();

        // loading spinner
        this.setState({loading1: true});
        const plan_type = this.state.planType;
        const plansData = {
            custom_name: this.state.custom_name,
            amount: this.state.amount
        };

        console.log('plansdata', plansData);
        PlanActions.updatePlan(this.state.planType, this.state.planId, plansData).subscribe(resp => {
            console.log(resp)
            this.setState(() => ({
                show: false,
                open: false
            }));
            PlanActions.getPlanDetail(this.state.planType, this.state.planId).subscribe(resp => {
                console.log(resp.data.data)
                this.setState({
                    plan: resp.data.data,
                    interest: this.state.plan.current_balance_with_interest - this.state.plan.current_balance
                })
            })
        })
    };
    onCloseModal = () => {
        this.setState({open: false});
    };
    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
        console.log(event)
    };

    render() {
        const {show, open, loading1} = this.state;
        const options1 = [
            {label: "Fixed", value: "fixeds"},
            {label: "Savers", value: "savers"},
            {label: "Life", value: "lives"}
        ];

        const options2 = [
            {label: "Public/Private", value: "Public/Private"},
            {label: "Public", value: "Public"},
            {label: "Private", value: "Private"}
        ];

        const options3 = [
            {label: "Select", value: ""},
            {label: "Daily", value: "Daily"},
            {label: "Weekly", value: "Weekly"},
            {label: "Pay as You Want", value: "Pay as You Want"}
        ];
        let showPlans;
        var maturityDay = this.state.plan === 'fixeds' ? Datetime.moment().add(6, 'month') : Datetime.moment().add(3, 'month');
        var maturityValid = function (current) {
            return current.isAfter(maturityDay);
        };
        return (<div>
            <Header/>

            {showPlans}
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
                                <h2 className="">{this.state.plan.custom_name}</h2>
                                <h6></h6>
                            </div>
                        </div>
                    </div>

                    <div className="card widget-flat text-center mx-auto" style={{width: 'fit-content'}}>
                        <div className="card-body">
                            <div className="p-1 pb-0 mx-3 float-left">
                                <Link to="/">
                                    <i className="fa fa-wallet fa-3x mb-2"></i>
                                    <h5 className="text-muted font-weight-normal mt-0">Save Now</h5>
                                </Link>
                            </div>
                            <div className="p-1 pb-0 mx-3 float-left">
                                <Link to={"/dashboard/edit/" + this.state.planType + "/" + this.state.planId}>
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
                                                <h3 className="mt-2">     &#8358;{this.formatMoney(this.state.plan.current_balance ? this.state.plan.current_balance : 0, 2, '.', ',')}
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="col-md-4 text-center">
                                            <div className="p-3 pb-0">
                                                <h5 className="text-muted font-weight-normal mt-0">Returns</h5>
                                                <h3 className="mt-2">   &#8358;{
                                                    this.formatMoney(this.state.plan.interest ? this.state.plan.interest : 0, 2, '.', ',')}
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="col-md-4 text-center">
                                            <div className="p-3 pb-0">
                                                <h5 className="text-muted font-weight-normal mt-0">Interest Per
                                                    Annum</h5>
                                                <h3 className="mt-2">10%</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">

                        <div className="col-xl-4">
                            <div className="card" style={{height: "calc(100% - 30px)"}}>
                                <div className="card-body">

                                    <h6>Start Date</h6>
                                    <p>{this.state.plan.start_date}</p>
                                    <h6>Maturity Date</h6>
                                    <p>{this.state.plan.maturity_date}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-8">
                            <div className={"row"}>
                                <div className="col-xl-12">
                                    <div className="card widget-flat">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-6 text-center">
                                                    <div className="p-3 pb-0">
                                                        <h5 className="text-muted font-weight-normal mt-0">Amount
                                                            Saved</h5>
                                                        <h3 className="mt-2">&#8358;{this.formatMoney(this.state.plan.current_balance ? this.state.plan.current_balance : 0, 2, '.', ',')}</h3>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 text-center">
                                                    <div className="p-3 pb-0">
                                                        <h5 className="text-muted font-weight-normal mt-0">Target
                                                            Amount</h5>
                                                        <h3 className="mt-2">&#8358;{this.formatMoney(this.state.plan.amount ? this.state.plan.amount : 0, 2, '.', ',')}</h3>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 offset-md-3 text-center">
                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar"
                                                             style={{width: this.state.plan.current_balance / this.state.plan.amount * 100 + '%'}}
                                                             aria-valuenow={this.state.plan.current_balance / this.state.plan.amount * 100}
                                                             aria-valuemin="0" aria-valuemax="100"></div>
                                                    </div>
                                                    <small>You have reached
                                                        a {this.state.plan.current_balance / this.state.plan.amount * 100}%
                                                        of your target.</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={"col-xl-12"}>
                                    <div className="card" style={{height: "calc(100% - 30px)"}}>
                                        <div className="card-body">
                                            <h4 className="header-title">Transactions</h4>

                                            <div className="table-responsive mt-3">
                                                <table className="table table-hover table-centered mb-0">
                                                    <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th>Description</th>
                                                        <th>Amount</th>
                                                    </tr>
                                                    </thead>


                                                    <tbody>
                                                    {this.state.plan.transactions.map((tx, key) => <tr>
                                                        <td><b>{tx.created_at}</b></td>
                                                        <td>
                                                            <b>{tx.type}</b>
                                                        </td>
                                                        <td>
                                                            {tx.amount}
                                                        </td>
                                                    </tr>)}
                                                    </tbody>
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
            <Footer/>
        </div>)
    }
}

export default ViewFixedPlan;