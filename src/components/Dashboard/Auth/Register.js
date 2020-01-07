
import { Component } from "react";
import React from "react";
import { connect } from 'react-redux';
import './Auth.css';
import { Link } from 'react-router-dom'
import axios from 'axios';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }
    componentDidMount() {

    }
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });

        const user = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            phone_number: this.state.phone_number,
            email: this.state.email,
            password: this.state.password,
            c_password: this.state.c_password,
        };
        console.log('hello')
        axios.post(`https://pallymate-api.herokuapp.com/api/register`, user)
            .then(res => {
                res.status === 200 ? window.location = '/dashboard/login' :
                console.log(res);
            })
    }
    render() {
        const { loading } = this.state;
        return (


            <div>
                <div className="account-pages mt-5 mb-5">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5">
                                <div className="card">

                                    <div className="card-body p-4">

                                        <div className="text-center w-75 m-auto">
                                            <a href="index.html">
                                                <h2>OnePally</h2>
                                                {/* <span><img src="assets/images/logo-dark.png" alt="" height="22" /></span> */}
                                            </a>
                                            <p className="text-muted mb-4 mt-3">Don't have an account? Create free account</p>
                                        </div>

                                        <form onSubmit={this.handleSubmit}>

                                            <div className="form-group mb-3">
                                                <label htmlFor="fullname">First Name</label>
                                                <input className="form-control" type="text" onChange={this.handleChange} name="first_name" placeholder="Enter your first name" required />
                                            </div>

                                            <div className="form-group mb-3">
                                                <label htmlFor="fullname">Last Name</label>
                                                <input className="form-control" type="text" onChange={this.handleChange} name="last_name" placeholder="Enter your last name" required />
                                            </div>

                                            <div className="form-group mb-3">
                                                <label htmlFor="emailaddress">Email address</label>
                                                <input className="form-control" type="email" onChange={this.handleChange} name="email" required placeholder="Enter your email" />
                                            </div>
                                            <div className="form-group mb-3">
                                                <label htmlFor="emailaddress">Phone Number</label>
                                                <input className="form-control" type="number" onChange={this.handleChange} name="phone_number" required placeholder="Enter your phone number" />
                                            </div>

                                            <div className="form-group mb-3">
                                                <label htmlFor="password">Password</label>
                                                <input className="form-control" type="password" required onChange={this.handleChange} name="password" placeholder="Enter your password" />
                                            </div>
                                            <div className="form-group mb-3">
                                                <label htmlFor="password">Retype Password</label>
                                                <input className="form-control" type="password" required name="c_password" onChange={this.handleChange} placeholder="Enter your password again" />
                                            </div>

                                            <div className="form-group mb-3">
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="checkbox-signup" />
                                                    <label className="custom-control-label" htmlFor="checkbox-signup">I accept <a href="pages-register.html#" className="text-muted">Terms and Conditions</a></label>
                                                </div>
                                            </div>

                                            <div className="form-group mb-0 text-center">
                                                <button className="btn btn-primary btn-block" type="submit" disabled={loading}>
                                                    {loading && (
                                                        <i className="log fa fa-refresh fa-spin"></i>
                                                    )}Create Account </button>
                                            </div>

                                        </form>
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="col-12 text-center">
                                        <p className="text-muted">Already have account? <Link to="/dashboard/login" className="text-dark ml-1"><b>Log In</b></Link></p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}
const mapStateToProps = state => {
    return { user: state.user };
};
export default connect(mapStateToProps)(Register);
