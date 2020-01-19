import React from 'react';
import '../Dashboard.css'
import Header from '../Header/Header'
import PlanActions from "../../js/actions/actions";
import PaystackButton from 'react-paystack';
import {Link} from 'react-router-dom'
import Footer from "../Footer/Footer";
import UserActions from "../../js/actions/userActions";

export default class SaveNow extends React.Component {
    componentWillMount() {

        let plan_list = [];
        PlanActions.getPlans().subscribe(resp => {
            console.log(resp.data)
            resp.data.map((plan) =>
                plan.plans.map((plan_item) => {
                    plan_item.plan_type = plan.type
                    if (plan_item.plan_type === "fixed" && plan_item.current_balance >= plan_item.amount) {
                        return plan_item
                    }
                    plan_list.push(plan_item)
                    return plan_item
                })
            );
            this.setState({
                plans: plan_list
            })
            console.log('hello', this.state.plans)

        })
        UserActions.getCards().subscribe(resp => {
            console.log(resp.data.data)
            this.setState({
                saved_cards: resp.data.data
            })
        })
    }

    callback = event => {
        console.log(event)
        if (event.status === "success") {

            this.setState({
                loading: true,
                payCB: true,
                paid: false,
                error: false
            })
            if (this.state.savePlan === "jara") {
                let params = {
                    trxref: event.trxref,
                    reference: event.reference,
                    type: 'jara',
                    plan_id: this.state.user.jara.id
                }
                PlanActions.saveNow(params).subscribe(resp => {
                    console.log(resp.data)
                    this.setState({
                        paid: true,
                        payCB: false,
                        loading: false
                    })
                    // window.location = "/dashboard/save"
                })
            } else {
                let params = {
                    trxref: event.trxref,
                    reference: event.reference,
                    type: this.state.savePlan.plan_type,
                    plan_id: this.state.savePlan.id
                }
                PlanActions.saveNow(params).subscribe(resp => {
                    console.log(resp.data)
                    this.setState({
                        paid: true,
                        payCB: false,
                        loading: false
                    })
                    // window.location = "/dashboard/plan/" + params.type + "s/" + params.plan_id
                },
                    error => {
                        console.log("error")
                        this.setState({
                            error: true,
                            payCB: false,
                            loading: false
                        })
                    })
            }
            console.log(this.state.savePlan)
        }
    }
    close = event => {

        console.log(event)
    }
    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});


    };
    handlePlanChange = event => {
        this.setState({savePlan: this.state.plans[event.target.value]});
        if (this.state.plans[event.target.value].plan_type === "fixed") {
            this.setState({
                amount: this.state.plans[event.target.value].amount,
                disableAmount: true
            })
            console.log(this.state.amount)
        } else {
            this.setState({
                disableAmount: false
            })
        }
    };
    getReference = () => {
        //you can put any unique reference implementation code here
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

        for (let i = 0; i < 15; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
    payWAuth = () => {
        this.setState({
            loading: true,
            payCB: true,
            paid: false,
            error: false
        })
        let params = {
            amount: this.state.amount,
            type: this.state.savePlan === "jara" ? "jara" : this.state.savePlan.plan_type,
            plan_id: this.state.savePlan === "jara" ? this.state.user.jara.id : this.state.savePlan.id,
            card_id: this.state.card,
            password: this.state.password
        }
        PlanActions.saveWAuth(params).subscribe(resp => {
                console.log(resp.data)

                this.setState({
                    paid: true,
                    payCB: false,
                    loading: false,
                    card: 'new'
                })
                // window.location = "/dashboard/save"

            },
            error => {
                console.log("error")
                this.setState({
                    error: true,
                    payCB: false,
                    loading: false
                })
            })
    }

    constructor(props) {
        super(props);

        this.state = {
            auth: localStorage.getItem("auth"),
            user: JSON.parse(localStorage.getItem('user')),
            plans: [],
            key: "pk_test_8e1083798c5a8dfbb6fd16ffce5542ebfc9b71e0",
            email: JSON.parse(localStorage.getItem("user")).email,  // customer email
            amount: 100,
            card: 'new',
            savePlan: 'jara',
            payCB: false,
            loading: false,
            saved_cards: [],
            auth_code: JSON.parse(JSON.parse(localStorage.getItem('user')).auth_code_object)
        };
        console.log('hii', this.state.auth_code)
    }

    render() {
        return (


            <div>
                <Header/>
                <div className="wrapper">
                    <div className="container-fluid">
                        {/* <Toast>
  <Toast.Header>
    <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
    <strong className="mr-auto">Bootstrap</strong>
    <small>11 mins ago</small>
  </Toast.Header>
  <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
</Toast> */}
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box">
                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item"><a href="/">OnePally</a></li>
                                            <li className="breadcrumb-item active">Save Now</li>
                                        </ol>
                                    </div>
                                    <h4 className="page-title">Save Now</h4>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xl-4 col-md-6 offset-xl-4 offset-md-3">
                                <div className="card">
                                    <div className="card-body">
                                        {this.state.payCB ? <div class="alert alert-warning" role="alert">
                                            Verifying payment, please wait!
                                        </div> : null}
                                        {this.state.paid ? <div class="alert alert-success" role="alert">
                                            Payment completed! <Link to={"/dashboard"}>Go to Dashboard</Link>
                                        </div> : null}
                                        {this.state.error ? <div class="alert alert-danger" role="alert">
                                            There was a problem, try again!
                                        </div> : null}
                                        <div className="form-group">
                                            <label>Save To</label>
                                            <select className="form-control" onChange={this.handlePlanChange}
                                                    name="savePlan">
                                                <option value="jara">Jara</option>
                                                {this.state.plans.map((valueX, index) =>
                                                    <option
                                                        value={index}>{valueX.plan_type}: {valueX.custom_name}</option>)}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Amount</label>

                                            <input className="form-control" value={this.state.amount} type="number"
                                                   onChange={this.handleChange} placeholder="100"
                                                   disabled={this.state.disableAmount} name="amount"/>
                                        </div>
                                        <div className="form-group">
                                            <label>Payment Method</label>
                                            <select style={{'text-transform': 'capitalize'}} name="card"
                                                    onChange={this.handleChange} className="form-control">
                                                <option value="new">New Card</option>
                                                {this.state.saved_cards.map((saved_card, index) =>
                                                    <option
                                                        value={saved_card.id}>{saved_card.card_type}: {saved_card.last4}
                                                    </option>
                                                )}
                                            </select>
                                        </div>
                                        <div className="form-group"
                                             style={{display: this.state.card === 'new' ? 'none' : 'block'}}>
                                            <label>Enter Password</label>
                                            <input type="password" className="form-control" onChange={this.handleChange}
                                                   name="password"/>
                                        </div>
                                        <div className="form-group">
                                            <input type="checkbox" className="checkbox" value={true} name="agree"
                                                   onChange={(e) => {
                                                       this.setState({agree: !this.state.agree})
                                                   }}/> I agree to make this payment
                                        </div>
                                        {this.state.card === 'new' ?
                                            <PaystackButton
                                                text={"Save " + this.state.amount + " NGN"}
                                                class="btn btn-primary btn-block"
                                                callback={this.callback}
                                                close={this.close}
                                                disabled={this.state.agree ? this.state.loading ? true : false : true}
                                                embed={false}
                                                reference={this.getReference()}
                                                email={this.state.email}
                                                amount={this.state.amount * 100}
                                                paystackkey={this.state.key}
                                                tag="button"
                                            /> :
                                            <button className="btn btn-primary btn-block"
                                                    disabled={this.state.agree ? this.state.loading ? true : false : true}
                                                    onClick={this.payWAuth}>
                                                {this.state.loading && (
                                                    <i className="log fa fa-refresh fa-spin"></i>
                                                )}
                                                Save {this.state.amount} NGN</button>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>

            </div>
        );
    }
}
