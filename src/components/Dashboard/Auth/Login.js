import React from "react";
import "./Auth.css";
import $axios from "api/api";
import "./Login.css";
import { Link } from "react-router-dom";
import UserActions from '../../js/actions/userActions';
import Cookie from 'utils/cookie';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }
  componentDidMount() { }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      error: false,
      loading: true
    })
    const user = {
      email: this.state.email,
      password: this.state.password
    };

    $axios.post(`/login`, user).subscribe(
      res => {
        // res.status === 200 ? window.location = '/dashboard/login' :
        if (res.data.data.token) {
          Cookie.setAuth(res.data.data.token)
          console.log(res.data);
          UserActions.getUser().subscribe(userData => {
            let user = userData.data.data
            user.jara = userData.data.jara[0]
            console.log(user)
            Cookie.setUser(user)
            // localStorage.setItem('user', JSON.stringify(user))
            window.location = "/dashboard";
          })
        } else {
          console.log("Error logging in");
          this.setState({
            error: true,
            loading: false
          })
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({
          error: true,
          loading: false
        })
      });

  };

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
                      <p className="text-muted mb-4 mt-3">You are amazing!</p>
                    </div>

                    {this.state.error ? <div class="alert alert-danger" role="alert">
                      Oops that was wrong, check your login details and try again!
                      </div> : null}


                    <form onSubmit={this.handleSubmit}>
                      <div className="form-group mb-3">
                        <label htmlFor="emailaddress">Email address</label>
                        <input
                          className="form-control"
                          type="email"
                          name="email"
                          required
                          onChange={this.handleChange}
                          placeholder="Enter your email"
                        />
                      </div>

                      <div className="form-group mb-3">
                        <a
                          href="pages-recoverpw.html"
                          className="text-muted float-right"
                        >
                          <small />
                        </a>
                        <label htmlFor="password">Password</label>
                        <input
                          className="form-control"
                          type="password"
                          required
                          onChange={this.handleChange}
                          name="password"
                          placeholder="Enter your password"
                        />
                      </div>

                      <div className="form-group mb-3">
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkbox-signin"
                            defaultChecked
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="checkbox-signin"
                          >
                            Remember me
                          </label>
                        </div>
                      </div>

                      <div className="form-group mb-0 text-center">
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                          disabled={loading}
                        >
                          {loading && (
                            <i className="log fa fa-refresh fa-spin"></i>
                          )}
                          Log In{" "}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-12 text-center">
                    <p className="text-muted">
                      {" "}
                      <Link to="/dashboard/forgot" className="text-muted ml-1">
                        Forgot your password?
                      </Link>
                    </p>
                    <p className="text-muted">
                      Don't have an account?{" "}
                      <Link to="/dashboard/register" className="text-dark ml-1">
                        <b>Create</b>
                      </Link>
                    </p>
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
