import React, { Component } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link } from 'react-router-dom'
import Modal from "react-responsive-modal";
import SelectListGroup from "./SelectListGroup";
import Datetime from 'react-datetime';
import PlanActions from "../../js/actions/actions";
import { getPlanDetail } from "../../js/actions/planActions";

class PlanDetail extends Component {

    constructor(props) {
        super(props);
        const { id, plan_type } = this.props.match.params

        this.state = {
            user: JSON.parse(localStorage.getItem('user')),
            open: false,
            show: false,
            plan: {},
            payment_mode: "",
            planId: id,
            planType: plan_type,
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
        this.setState({ loading1: true });
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
        this.setState({ open: false });
    };
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        console.log(event)
    };
    render() {
        const { show, open, loading1 } = this.state;
        const options1 = [
            { label: "Fixed", value: "fixeds" },
            { label: "Savers", value: "savers" },
            { label: "Life", value: "lives" }
        ];

        const options2 = [
            { label: "Public/Private", value: "Public/Private" },
            { label: "Public", value: "Public" },
            { label: "Private", value: "Private" }
        ];

        const options3 = [
            { label: "Select", value: "" },
            { label: "Daily", value: "Daily" },
            { label: "Weekly", value: "Weekly" },
            { label: "Pay as You Want", value: "Pay as You Want" }
        ];
        let showPlans;
        var maturityDay = this.state.plan === 'fixeds' ? Datetime.moment().add(6, 'month') : Datetime.moment().add(3, 'month');
        var maturityValid = function (current) {
            return current.isAfter(maturityDay);
        };
        if (show) {
            showPlans = (
                <div>
                    <Modal open={open} onClose={this.onCloseModal} center>
                        <h3>Edit Plan</h3>
                        <form style={{ width: 400 }}>
                            <div className="col-md-12">

                                <div className="form-group">
                                    <label>Plan Name</label>
                                    <input
                                        placeholder="Plan Name"
                                        type="text"
                                        onChange={this.handleChange}
                                        name="custom_name"
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Amount</label>
                                    <input
                                        placeholder="Amount"
                                        type="number"
                                        onChange={this.handleChange}
                                        min="1"
                                        step="1"
                                        name="amount"
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group" style={{
                                    display:
                                        this.state.plan === "lives"
                                            ? true
                                            : 'none'
                                }
                                }>
                                    <label>Payment Mode</label>
                                    <SelectListGroup
                                        placeholder="Select"
                                        name="payment_mode"
                                        value={this.state.payment_mode}
                                        onChange={this.handleChange}
                                        options={options3}

                                    />
                                </div>

                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={this.handleSubmit}
                                    disabled={loading1}
                                >
                                    {loading1 && (
                                        <i className="log fa fa-refresh fa-spin"></i>
                                    )}
                                    Update
                          </button>
                            </div>
                        </form>

                    </Modal>
                </div>
            );
        }
        return (<div>
            <Header />

            {showPlans}
            <div className="wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box">
                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><Link to="/dashboard">OnePally</Link></li>
                                        <li className="breadcrumb-item"><Link to="/dashboard/plans">Plans</Link></li>
                                        <li className="breadcrumb-item active">{this.state.plan.custom_name}</li>
                                    </ol>
                                </div>
                                <h4 className="page-title">{this.state.plan.custom_name}</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">


                    <div className="row">
                        <div className="col-xl-4 col-lg-6 text-center">
                            <div className="card widget-flat">
                                <div className="card-body p-0">
                                    <div className="p-3 pb-0">
                                        <h5 className="text-muted font-weight-normal mt-0">Balance</h5>
                                        <h3 className="mt-2">
                                            &#8358;{this.formatMoney(this.state.plan.current_balance ? this.state.plan.current_balance : 0, 2, '.', ',')}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 text-center">
                            <div className="card widget-flat">
                                <div className="card-body p-0">
                                    <div className="p-3 pb-0">
                                        <h5 className="text-muted font-weight-normal mt-0">Target</h5>
                                        <h3 className="mt-2">
                                            &#8358;{this.formatMoney(this.state.plan.amount ? this.state.plan.amount : 0, 2, '.', ',')}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 text-center">
                            <div className="card widget-flat">
                                <div className="card-body p-0">
                                    <div className="p-3 pb-0">
                                        <h5 className="text-muted font-weight-normal mt-0">Returns</h5>
                                        <h3 className="mt-2">
                                            &#8358;{
                                                this.formatMoney(this.state.plan.interest ? this.state.plan.interest : 0, 2, '.', ',')}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 text-center mb-3">
                        <button className="btn btn-primary mr-2" onClick={() => {
                            console.log('edit')
                            this.setState(() => ({
                                show: true,
                                open: true
                            }));
                        }}><i className="fa fa-pencil"></i> Edit Plan</button>
                        <button className="btn btn-secondary ml-2"><i className="fa fa-bank"></i> Withdraw</button>
                    </div>
                    <div className="row">

                        <div className="col-xl-4">
                            <div className="card" style={{ height: "calc(100% - 30px)" }}>
                                <div className="card-body">

                                    <h6>Interest Rate P.A</h6>
                                    <p>10%</p>
                                    <h6>Savings Preference</h6>
                                    <p>200/Daily</p>
                                    <h6>Status</h6>
                                    <p><span className="badge badge-success">active</span></p>
                                    <h6>Start Date</h6>
                                    <p>2 October, 2019</p>
                                    <h6>Maturity Date</h6>
                                    <p>2 February, 2020</p>
                                    <h6>Next Saving Date</h6>
                                    <p>22 November, 2019</p>
                                    <h6>Payment Method</h6>
                                    <p>**** 2019</p>
                                    <div class="progress">
                                        <div class="progress-bar" role="progressbar" style={{ width: '55%' }} aria-valuenow="55" aria-valuemin="0" aria-valuemax="100">55%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-8">
                            <div className="card" style={{ height: "calc(100% - 30px)" }}>
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
                                                {this.state.txs.map((tx, key) => <tr><td><b>{tx.created_at}</b></td>
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
            <Footer />
        </div>)
    }
}

export default PlanDetail;