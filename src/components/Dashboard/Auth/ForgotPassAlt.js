import React from "react";
import "./Auth.css";
import axios from "axios";
import "./Login.css";
import {Link} from "react-router-dom";
import UserActions from '../../js/actions/userActions';
import logo from '../assets/images/logo.png'

export default class ForgotPassAlt extends React.Component {
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

        const user = {
            email: this.state.email,
        };

        axios.post(`https://pallymate-api.herokuapp.com/api/password/email`, user)
            .then(res => {
                console.log(res)
            }).catch(
            err => {
                console.log(err)
            }
        )
    };
    render() {
        const {loading} = this.state;
        return (
            <div>
                <div className="row">
                    <div className="col-lg-5 bg-primary p-0" style={{marginBottom: -60, height: '100vh'}}>
                      <div className={"container"}>
              <span className="logo-lg">
                                        <img src={logo} className={"mt-2"} alt="" height="25"/>
                                    </span>
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
                                                        <h2 className={"text-primary"}>Reset Password</h2>
                                                    <p className="text-muted mb-4 mt-3">You are amazing!</p>
                                                </div>

                                                <form onSubmit={this.handleSubmit}>

                                                    <div className="form-group mb-3">
                                                        <label htmlFor="emailaddress">Email address</label>
                                                        <input className="form-control" type="email" name="email" required onChange={this.handleChange} placeholder="Enter your email" />
                                                    </div>



                                                    <div className="form-group mb-0 text-center">
                                                        <button type="submit" className="btn btn-primary btn-block"> Reset Password</button>
                                                    </div>

                                                </form>
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-12 text-center">
                                                <p className="text-muted"> <Link to="/dashboard/login" className="text-muted ml-1">Back to Login</Link></p>
                                                <p className="text-muted">Don't have an account? <Link to="/dashboard/register" className="text-dark ml-1"><b>Create</b></Link></p>
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
