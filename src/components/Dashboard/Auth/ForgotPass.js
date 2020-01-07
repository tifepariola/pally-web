import React from 'react';
import './Auth.css';
import axios from 'axios';
import {Link} from 'react-router-dom'

export default class ForgotPass extends React.Component {
    componentDidMount() {

    }
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }
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
    }
    render() {
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
            </div >
        );
    }
}
