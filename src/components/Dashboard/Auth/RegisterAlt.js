import React from "react";
import "./Auth.css";
import axios from "axios";
import "./Login.css";
import {Link} from "react-router-dom";
import UserActions from '../../js/actions/userActions';
import logo from '../assets/images/logo.png'

export default class RegisterAlt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    componentDidMount() {
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };
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
        const {loading} = this.state;
        return (
            <div>
                <div className="row">
                    <div className="col-lg-5 bg-primary p-0" style={{marginBottom: -60}}>
                      <div className={"container"}>
              <span className="logo-lg">
                                        <img src={logo} className={"mt-2"} alt="" height="25"/>
                                    </span>
                      </div>
                        <div style={{position: 'absolute', top: 'calc(50% - 60px)', right: 0}}>
                            <Link to={"/dashboard/login"}
                                    className={"btn btn-primary btn-lg btn-block rounded-0 text-white float-right"}>Sign
                                In
                            </Link>
                            <button type="submit"
                                    className={"btn btn-white btn-lg btn-block mt-0 rounded-0 text-primary float-right"}>Sign
                                Up
                            </button>
                        </div>
                      <div className={"mb-2"} style={{position: 'absolute', bottom: 0}}>
                        <div className={"container"}>
                          <span className={"text-white mr-1"}>Follow</span>
                      <i className={"fab fa-twitter fa-lg mx-1 text-white"}></i>
                          <i className={"fab fa-instagram fa-lg mx-1 text-white"}></i>
                          <i className={"fab fa-facebook fa-lg mx-1 text-white"}></i>
                      </div>
                      </div>
                    </div>
                    <div className="col-lg-7 bg-white" style={{marginBottom: -60}}>
                        <div className="account-pages mt-5 mb-5">

                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-lg-8">
                                        <div className="card border-0">

                                            <div className="card-body p-4">

                                                <div className="text-center w-75 m-auto">
                                                        <h2 className={"text-primary"}>Create an account</h2>
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
                    </div>
                </div>
            </div>
        );
    }
}
