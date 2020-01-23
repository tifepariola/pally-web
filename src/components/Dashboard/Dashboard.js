import React from 'react';
import './Dashboard.css';
import {Doughnut} from 'react-chartjs-2';
import history from './../../history';
import Header from './Header/Header';
import {Link} from 'react-router-dom'
import PlanActions from "../js/actions/actions";
import UserActions from '../js/actions/userActions';

const data = {
    labels: [
        'Fixed Deposit',
        'Life Goal',
        'Esusu/Ajo'
    ],
    datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
            '#6254e8',
            '#f1556c',
            '#e3eaef'
        ],
        hoverBackgroundColor: [
            '#6254e8',
            '#f1556c',
            '#e3eaef'
        ]
    }]
};
export default class Dashboard extends React.Component {
    constructor() {
        super();
        if (!localStorage.getItem('auth')) {
            window.location = "/dashboard/login"
            // history.push('/dashboard/login');
        }
        this.state = {
            user: JSON.parse(localStorage.getItem('user')),
            auth: localStorage.getItem('auth'),
            txs: [],
            savingsBalance: 0,
            currentReturns: 0,
            totalBalance: JSON.parse(localStorage.getItem('user')).jara.current_balance
        }
    }

    componentWillMount() {

        UserActions.getTx().subscribe(resp => {
            console.log('txss', resp.data)
            this.setState({
                txs: resp.data.data.transactions,
                currentReturns: resp.data.data.current_returns,
                savingsBalance: resp.data.data.balance,
                totalBalance: resp.data.data.jara_balance + resp.data.data.balance
            })
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

    getTx() {

    }

    render() {
        return (


            <div>
                <Header/>
                <div className="wrapper">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box">
                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item"><a href="/">OnePally</a></li>
                                            <li className="breadcrumb-item active">Dashboard</li>
                                        </ol>
                                    </div>
                                    <h4 className="page-title">Dashboard</h4>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xl-4 col-lg-4 text-center">
                                <div className="card widget-flat h-75">
                                    <div className="card-body p-0">
                                        <div className="p-3 pb-0">
                                            <h5 className="text-muted font-weight-normal mt-0">Total Balance</h5>
                                            <h3 className="mt-2">&#8358;{this.formatMoney(this.state.totalBalance ? this.state.totalBalance : 0, 2, '.', ',')}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 text-center">
                                <div className="card widget-flat h-75">
                                    <div className="card-body p-0">
                                        <div className="p-3 pb-0">
                                            <h5 className="text-muted font-weight-normal mt-0">Savings Balance</h5>
                                            <h3 className="mt-2">&#8358;{this.formatMoney(this.state.savingsBalance ? this.state.savingsBalance : 0, 2, '.', ',')}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 text-center">
                                <div className="card widget-flat h-75">
                                    <div className="card-body p-0">
                                        <div className="p-3 pb-0">
                                            <h5 className="text-muted font-weight-normal mt-0">Jara Balance</h5>
                                            <h3 className="mt-2">&#8358;{this.formatMoney(this.state.user.jara ? this.state.user.jara.current_balance : 0, 2, '.', ',')}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-4">
                                <div className="card widget-flat">
                                    <div className="card-body p-0">
                                        <div className="p-3 pb-0">
                                            <h3>Save Now</h3>
                                            <h6>Add fund instantly to a plan</h6>
                                            <Link to="/dashboard/save" className="btn btn-link"><i
                                                className="fa fa-plus"></i> Add Money</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-4">
                                <div className="card widget-flat bg-primary text-white">
                                    <div className="card-body p-0">
                                        <div className="p-3 pb-0">
                                            <h3>Create A Plan</h3>
                                            <h6>The first step to financial head way</h6>
                                            <Link to="/dashboard/create" className="btn btn-link text-white"><i
                                                className="fa fa-plus"></i> Create Plan</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4">
                                <div className="card widget-flat">
                                    <div className="card-body p-0">
                                        <div className="p-3 pb-0">
                                            <h3>Earn Rewards</h3>
                                            <h6>Invite a friend and get rewarded</h6>
                                            <button className="btn btn-link"><i className="fa fa-arrow-right"></i> Get
                                                Link
                                            </button>
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
                            <div className="col-xl-9">
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
                                                {this.state.txs.map((tx, key) => <tr>
                                                    <td><b>{tx.data.created_at}</b></td>
                                                    <td>
                                                        <b>{tx.data.type}</b>
                                                    </td>
                                                    <td>
                                                        {tx.data.amount}
                                                    </td>
                                                </tr>)}
                                                </tbody>
                                            </table>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-3">

                            </div>
                        </div>
                    </div>
                </div>
                <footer className="footer">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6">
                                OnePally &copy; 2019
                            </div>
                            <div className="col-md-6">
                                <div className="text-md-right footer-links d-none d-sm-block">
                                    <a href="/">About Us</a>
                                    <a href="/">Help</a>
                                    <a href="/">Contact Us</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}
