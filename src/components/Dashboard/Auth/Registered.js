import React from "react";
import "./Auth.css";
import axios from "axios";
import "./Login.css";
import {Link} from "react-router-dom";
import UserActions from '../../js/actions/userActions';
import logo from '../assets/images/logo.png'

export default class Registered extends React.Component {
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
                    <div className="col-lg-7 bg-white" style={{marginBottom: -60, minHeight: 100+'vh'}}>
                        <div className="account-pages mt-5 mb-5">

                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-lg-8">
                                        <div className="card border-0">

                                            <div className="card-body p-4">

                                                <div className="text-center w-75 m-auto">
                                                        <h2 className={"text-primary"}>Yaay!</h2>
                                                    <p className="text-muted mb-4 mt-3">You've created an account, one more thing! Click the link in the email we sent to you to verify your account.</p>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-12 text-center">
                                                <p className="text-muted">Verified? <Link to="/dashboard/login" className="text-dark ml-1"><b>Log In</b></Link></p>
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
