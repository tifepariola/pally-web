import React, { Component } from "react";
import "./Profile.css";
import SelectListGroup from "../MyPlans/SelectListGroup";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Datetime from 'react-datetime';
import Modal from "react-responsive-modal";
import UserActions from "../../js/actions/userActions";

class Profile extends Component {
  constructor(props) {
    super(props);
    let user = JSON.parse(localStorage.getItem('user'))
    this.state = {
      addBank: false,
      user: user,
      last_name: user.last_name,
      bvn: user.bvn ? user.bvn : '',
      first_name: user.first_name,
      phone_number: user.phone_number,
      email: user.email,
      account_no: "",
      account_name: "",
      banks: [],
      date_of_birth: user.date_of_birth ? user.date_of_birth : '',
      gender: user.gender,
      address: user.address,
      next_of_kin_name: user.next_of_kin_name ? user.next_of_kin_name : '',
      next_of_kin_email: user.next_of_kin_email ? user.next_of_kin_email : '',
      next_of_kin_phone_number: user.next_of_kin_phone_number ? user.next_of_kin_phone_number : '',
      next_of_kin_gender: user.next_of_kin_gender ? user.next_of_kin_gender : '',
      next_of_kin_relationship: user.next_of_kin_relationship ? user.next_of_kin_relationship : '',
      next_of_kin_bank_code: user.next_of_kin_bank_code ? user.next_of_kin_bank_code : '',
      next_of_kin_bank_details: user.next_of_kin_bank_details ? user.next_of_kin_bank_details : '',
      plan: "",
      relationship_status: user.relationship_status ? user.relationship_status : '',
      employment_status: user.employment_status ? user.employment_status : '',
      id_type: user.id_type ? user.id_type : '',
      id_number: user.id_number ? user.id_number : '',
      id_issued_date: user.id_issued_date ? user.id_issued_date : '',
      id_expiry_date: user.id_expiry_date ? user.id_expiry_date : '',
      maiden_name: user.maiden_name ? user.maiden_name : '',
      auth_code: JSON.parse(JSON.parse(localStorage.getItem('user')).auth_code_object),
      error: false,
      done: false

    };
    this.handleDate = this.handleDate.bind(this);
    this.handleIssueDate = this.handleIssueDate.bind(this);
    this.handleExpiryDate = this.handleExpiryDate.bind(this);
  }
  componentWillMount() {

    UserActions.getBanks().subscribe(resp => {
      this.setState({
        banks: resp.data.data
      })
      console.log('banks', resp.data.data)
    })
  }
  handleDate(date) {
    this.setState({ date_of_birth: date._d.toISOString().split("T")[0] });
    console.log(this.state.date_of_birth)
  };
  handleIssueDate(date) {
    this.setState({ id_issued_date: date._d.toISOString().split("T")[0] });
    console.log(this.state.id_expiry_date)
  };
  handleExpiryDate(date) {
    this.setState({ id_expiry_date: date._d.toISOString().split("T")[0] });
    console.log(this.state.id_expiry_date)
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state.last_name)
  };
  onCloseModal = () => {
    this.setState({ addBank: false });
  };
  handleSubmit = event => {
    this.setState({
      loading: true,
      error: false,
      done: false
    })
    event.preventDefault();
    const params = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      gender: this.state.gender,
      date_of_birth: this.state.date_of_birth,
      address: this.state.address
    };
    UserActions.updateUser(params).subscribe(resp => {
      console.log(resp)
      this.setState({
        loading: false,
        done: true
      })
    }, error => {
      this.setState({ error: true, loading: false })

    })
  };
  verifyBank = event => {
    event.preventDefault();
    const params = {
      account_no: this.state.account_no,
      bank_code: this.state.bank_code,
    };
    UserActions.verifyBank(params).subscribe(resp => {
      this.setState({
        account_name: resp.data.data.account_name
      })
      console.log(resp)
    }, error => {
      this.setState({ error: true, loading: false })
    })
  };
  changePass = event => {
    this.setState({
      loading: true,
      error: false,
      done: false
    })
    event.preventDefault();
    const params = {
      old_password: this.state.old_password,
      new_password: this.state.new_password,
      c_password: this.state.c_password,
    };
    UserActions.changePass(params).subscribe(resp => {
      this.setState({
        loading: false,
        done: true
      })
      console.log(resp)
    }, error => {
      this.setState({ error: true, loading: false })
    })
  }
  submitBank = event => {
    event.preventDefault();
    const params = {
      account_no: this.state.account_no,
      bank_code: this.state.bank_code,
    };
    UserActions.submitBank(params).subscribe(resp => {

      console.log(resp.data)
      const bank_details = {
        account_number: resp.data.data.account_number,
        account_name: resp.data.data.account_name,
      }
      const banks = this.state.user.bank_details
      banks.push(bank_details)
      const user = this.state.user
      user.bank_details = banks
      this.setState({
        user: user,
        addBank: false
      })
      // window.location = "/dashboard/profile"
    }, error => {
      this.setState({ error: true, loading: false })

    })
  };
  removeBank = (account_no) => {
    const params = {
      account_no: account_no,
    };
    UserActions.removeBank(params).subscribe(resp => {
      console.log(resp.data)
      window.location = "/dashboard/profile"
    })
  };
  handleSubmitNOK = event => {
    this.setState({
      loading: true,
      error: false,
      done: false
    })
    event.preventDefault();
    const params = {
      next_of_kin_name: this.state.next_of_kin_name,
      next_of_kin_email: this.state.next_of_kin_email,
      next_of_kin_phone_number: this.state.next_of_kin_phone_number,
      next_of_kin_gender: this.state.next_of_kin_gender,
      next_of_kin_relationship: this.state.next_of_kin_relationship,
      next_of_kin_bank_code: this.state.next_of_kin_bank_code,
      next_of_kin_bank_details: this.state.next_of_kin_bank_details,
    };
    UserActions.updateUser(params).subscribe(resp => {
      console.log(resp)
      this.setState({
        loading: false,
        done: true
      })
    }, error => {
      this.setState({ error: true, loading: false })
    })
  };
  handleSubmitKYC = event => {
    this.setState({
      loading: true,
      error: false,
      done: false
    })
    event.preventDefault();
    const params = {
      maiden_name: this.state.maiden_name,
      relationship_status: this.state.relationship_status,
      employment_status: this.state.employment_status,
      id_type: this.state.id_type,
      id_number: this.state.id_number,
      id_issued_date: this.state.id_issued_date,
      id_expiry_date: this.state.id_expiry_date
    };
    UserActions.updateUser(params).subscribe(resp => {

      console.log(resp)
      this.setState({
        loading: false,
        done: true
      })
    }, error => {
      console.log(error)
      this.setState({ error: true, loading: false })
    })

  };
  verifyBVN = event => {
    event.preventDefault();
    const params = {
      bvn: this.state.bvn,
    };
    UserActions.updateUser(params).subscribe(resp => {

      console.log(resp)
    })
  };

  render() {
    const options1 = [
      { label: "Plan ", value: "Plan " },
      { label: "Fixed", value: "fixeds" },
      { label: "Savers", value: "savers" },
      { label: "Life", value: "lives" }
    ];
    return (
      <div>
        <Header />
        <div className="wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box">
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="/">OnePally</a>
                      </li>
                      <li className="breadcrumb-item active">My Account</li>
                    </ol>
                  </div>
                  <h4 className="page-title">My Account</h4>
                </div>
              </div>
            </div>
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li className="nav-item">
                <a className="nav-link active" id="pills-account-tab" data-toggle="pill" href="#pills-account" role="tab" aria-controls="pills-account" aria-selected="true">Account</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="pills-banks-tab" data-toggle="pill" href="#pills-banks" role="tab" aria-controls="pills-banks" aria-selected="false">Banks & Cards</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="pills-next-tab" data-toggle="pill" href="#pills-next" role="tab" aria-controls="pills-next" aria-selected="false">Next of Kin</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="pills-security-tab" data-toggle="pill" href="#pills-security" role="tab" aria-controls="pills-security" aria-selected="false">Security</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="pills-kyc-tab" data-toggle="pill" href="#pills-kyc" role="tab" aria-controls="pills-kyc" aria-selected="false">KYC</a>
              </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
              {this.state.error ? <div class="alert alert-danger" role="alert">
                There was an error, please check all fields!
                      </div> : null}
              {this.state.done ? <div class="alert alert-success" role="alert">
                Profile updated successfully!
                      </div> : null}
              <div className="tab-pane fade show active" id="pills-account" role="tabpanel" aria-labelledby="pills-account-tab">
                <div className="col-xl-6 offset-xl-3">
                  <div className="card widget-flat">
                    <div className="card-body p-0">
                      <div className="p-3 pb-0">
                        <form>

                          <div className="form-group">
                            <label>First Name</label>
                            <input type="text" className="form-control" name="first_name" value={this.state.first_name} onChange={this.handleChange} />
                          </div>
                          <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" className="form-control" name="last_name" value={this.state.last_name} onChange={this.handleChange} />
                          </div>
                          <div className="form-group">
                            <label>Date of Birth</label>
                            <Datetime input={true} value={this.state.date_of_birth.split(" ")[0]} closeOnSelect={true} timeFormat={false} inputProps={{ placeholder: 'Click to select...' }} onChange={this.handleDate} />
                          </div>
                          <div className="form-group">
                            <label>Gender</label>

                            <div className="form-check">
                              <input className="form-check-input" type="radio" name="gender" defaultChecked={this.state.gender === 'male'} onChange={this.handleChange} id="inlineRadio1" value="male" />
                              <label className="form-check-label">Male</label>
                            </div>
                            <div className="form-check">
                              <input className="form-check-input" type="radio" name="gender" defaultChecked={this.state.gender === 'female'} onChange={this.handleChange} id="inlineRadio2" value="female" />
                              <label className="form-check-label">Female</label>
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Full Address</label>
                            <textarea className="form-control" onChange={this.handleChange} value={this.state.address ? this.state.address : ''} name="address"></textarea>
                          </div>
                          <button type="button" disabled={this.state.loading ? true : false} className="btn btn-primary" onClick={this.handleSubmit}>
                            {this.state.loading && (
                              <i className="log fa fa-refresh fa-spin"></i>
                            )}
                            Update Profile
                        </button>
                        </form>

                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div className="tab-pane fade" id="pills-banks" role="tabpanel" aria-labelledby="pills-banks-tab">
                <div className="row mt-2">
                  <div className="col-xl-6">
                    <div className="card widget-flat">
                      <div className="card-body">
                        <h4 className="card-title">Cards</h4>
                        <table className="table">
                          <thead>
                            <tr>
                              <td>Type</td>
                              <td>Number</td>
                              <td>Expiry</td>
                              {/* <td>Action</td> */}
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.auth_code ?
                              <tr style={{ "text-transform": "capitalize" }}>
                                <td>
                                  {this.state.auth_code.brand}
                                </td>
                                <td>**** {this.state.auth_code.last4}</td>
                                <td>{this.state.auth_code.exp_month}/{this.state.auth_code.exp_year}</td>
                                {/* <td>Delete</td> */}
                              </tr> : null}

                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="card widget-flat">
                      <div className="card-body">
                        <h4 className="card-title float-left">Banks</h4>
                        <button className="btn btn-primary float-right mb-2" onClick={() => this.setState({ addBank: true })}><i className="fa fa-plus"></i> Add</button>
                        <table className="table">
                          <thead>
                            <tr>
                              <td>Account Name</td>
                              <td>Account Number</td>
                              <td>Action</td>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.user.bank_details ? this.state.user.bank_details.map((bank_detail) =>
                              <tr>
                                <td>{bank_detail.account_name}</td>
                                <td>{bank_detail.account_number}</td>
                                <td>
                                  <button className="btn btn-sm btn-link" onClick={() => this.removeBank(bank_detail.account_number)}>Remove</button>
                                </td>
                              </tr>
                            ) : null}

                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="pills-next" role="tabpanel" aria-labelledby="pills-next-tab">
                <div className="col-xl-6 offset-xl-3">
                  <div className="card widget-flat">
                    <div className="card-body p-0">
                      <div className="p-3 pb-0">
                        <form>

                          <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" name="next_of_kin_name" value={this.state.next_of_kin_name} onChange={this.handleChange} />
                          </div>
                          <div className="form-group">
                            <label>Email Address</label>
                            <input type="text" className="form-control" name="next_of_kin_email" value={this.state.next_of_kin_email} onChange={this.handleChange} />
                          </div>
                          <div className="form-group">
                            <label>Phone Number</label>
                            <input type="text" className="form-control" name="next_of_kin_phone_number" value={this.state.next_of_kin_phone_number} onChange={this.handleChange} />
                          </div>
                          <div className="form-group">
                            <label>Gender</label>

                            <div className="form-check">
                              <input className="form-check-input" type="radio" name="next_of_kin_gender" defaultChecked={this.state.next_of_kin_gender === 'male'} onChange={this.handleChange} id="inlineRadio1" value="male" />
                              <label className="form-check-label">Male</label>
                            </div>
                            <div className="form-check">
                              <input className="form-check-input" type="radio" name="next_of_kin_gender" defaultChecked={this.state.next_of_kin_gender === 'female'} onChange={this.handleChange} id="inlineRadio2" value="female" />
                              <label className="form-check-label">Female</label>
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Relationship</label>
                            <input type="text" className="form-control" name="next_of_kin_relationship" value={this.state.next_of_kin_relationship} onChange={this.handleChange} />
                          </div>
                          <div className="form-group">
                            <label>Full Address</label>
                            <textarea className="form-control" onChange={this.handleChange} value={this.state.address ? this.state.address : ''} name="address"></textarea>
                          </div>
                          <div className="form-group">
                            <label>Bank Code</label>
                            <select className="form-control" name="next_of_kin_bank_code" value={this.state.next_of_kin_bank_code} onChange={this.handleChange}>
                              {
                                this.state.banks.map((bank, key) =>
                                  <option key={key} value={bank.code}>{bank.name}</option>

                                )
                              }
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Account Number</label>
                            <input type="text" className="form-control" name="next_of_kin_bank_details" value={this.state.next_of_kin_bank_details} onChange={this.handleChange} />
                          </div>
                          <button type="button" disabled={this.state.loading ? true : false} className="btn btn-primary" onClick={this.handleSubmitNOK}>
                            {this.state.loading && (
                              <i className="log fa fa-refresh fa-spin"></i>
                            )}
                            Update Next of Kin
                        </button>
                        </form>

                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div className="tab-pane fade" id="pills-security" role="tabpanel" aria-labelledby="pills-security-tab">
                <div className="col-xl-6 offset-xl-3">
                  <div className="card widget-flat">
                    <div className="card-body p-0">
                      <div className="p-3 pb-0">
                        <form>

                        <div className="form-group">
                            <label>Email Address</label>
                            <input type="text" className="form-control" value={this.state.email} disabled />
                          </div>
                          <div className="form-group">
                            <label>Phone Number</label>
                            <input type="text" className="form-control" value={this.state.phone_number} disabled />
                          </div>
                          <div className="form-group">
                            <label>Current Password</label>
                            <input type="password" className="form-control" name="old_password" onChange={this.handleChange} />
                          </div>
                          <div className="form-group">
                            <label>New Password</label>
                            <input type="password" className="form-control" name="new_password" onChange={this.handleChange} />
                          </div>
                          <div className="form-group">
                            <label>Confirm New Password</label>
                            <input type="password" className="form-control" name="c_password" onChange={this.handleChange} />
                          </div>
                          <button type="button" disabled={this.state.loading ? true : false} onClick={this.changePass} className="btn btn-primary mb-3">
                          {this.state.loading && (
                              <i className="log fa fa-refresh fa-spin"></i>
                            )}
                            Change Password
                        </button>
                          <div className="form-group">
                            <label>BVN</label>
                            <input type="text" className="form-control" name="bvn" value={this.state.user.bvn ? "*******"+this.state.bvn.slice(7, 11): null} disabled={this.state.user.bvn ? true : false} onChange={this.handleChange} />
                          </div>
                          <button type="button" className="btn btn-primary" disabled={this.state.user.bvn} onClick={this.verifyBVN}>
                            Save
                        </button>
                        <small style={{marginLeft: 10, display: this.state.user.bvn ? 'unset' : 'none'}}>Your Verified Informations, helps us keep Your Account Secured, need to make a change? Send us an email to hello@pallymate.com</small>
                        </form>

                      </div>
                    </div>
                  </div>
                </div>
                <Modal open={this.state.addBank} onClose={this.onCloseModal} center>
                  <h3>Add Bank</h3>
                  <form style={{ width: 400 }}>
                    <div className="col-md-12">

                      <div className="form-group">
                        <label>Bank Code</label>
                        <select className="form-control" name="bank_code" value={this.state.bank_code} onChange={this.handleChange}>
                          {
                            this.state.banks.map((bank, key) =>
                              <option key={key} value={bank.code}>{bank.name}</option>

                            )
                          }
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Account Number</label>
                        <input type="text" className="form-control" name="account_no" value={this.state.account_no} onChange={this.handleChange} />
                      </div>
                      <div className="form-group">
                        <label>Account Name</label>
                        <input type="text" className="form-control" value={this.state.account_name} disabled />
                      </div>
                      {this.state.account_name === "" ?
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={this.verifyBank}
                        >
                          Resolve
                      </button> :
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={this.submitBank}
                        >
                          Submit
                </button>}

                      <button className="btn btn-primary btn-link ml-2">
                        Cancel
                    </button>
                    </div>
                  </form>

                </Modal>

              </div>
              <div className="tab-pane fade" id="pills-kyc" role="tabpanel" aria-labelledby="pills-kyc-tab">
                <div className="col-xl-6 offset-xl-3">
                  <div className="card widget-flat">
                    <div className="card-body p-0">
                      <div className="p-3 pb-0">
                        <form>

                        <div className="form-group">
                            <label>ID Type</label>
                            <select className="form-control" name="id_type" value={this.state.id_type} onChange={this.handleChange} >
                              <option>National ID</option>
                              <option>Driver's License</option>
                              <option>Voter's Card</option>
                              <option>School ID</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label>ID Number</label>
                            <input type="text" className="form-control" name="id_number" value={this.state.id_number} onChange={this.handleChange} />
                          </div>
                          <div className="form-group">
                            <label>Date of Issue</label>
                            <Datetime input={true} value={this.state.id_issued_date.split(" ")[0]} closeOnSelect={true} timeFormat={false} inputProps={{ placeholder: 'Click to select...' }} onChange={this.handleIssueDate} />
                          </div>
                          <div className="form-group">
                            <label>Date of Expiry</label>
                            <Datetime input={true} value={this.state.id_expiry_date.split(" ")[0]} closeOnSelect={true} timeFormat={false} inputProps={{ placeholder: 'Click to select...' }} onChange={this.handleExpiryDate} />
                          </div>
                          <div className="form-group">
                            <label>Relationship Status</label>
                            <select className="form-control" name="relationship_status" value={this.state.relationship_status} onChange={this.handleChange} >
                              <option>Single</option>
                              <option>Married</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Employment Status</label>
                            <select className="form-control" name="employment_status" value={this.state.employment_status} onChange={this.handleChange} >
                              <option>Student</option>
                              <option>Employed</option>
                              <option>Self Employed</option>
                              <option>Retired</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Mother's Maiden Name</label>
                            <input type="text" className="form-control" name="maiden_name" value={this.state.maiden_name} onChange={this.handleChange} />
                          </div>
                          <button type="button" className="btn btn-primary mb-3" onClick={this.handleSubmitKYC}>
                            Update KYC
                        </button>
                        </form>

                      </div>
                    </div>
                  </div>
                </div>
                <Modal open={this.state.addBank} onClose={this.onCloseModal} center>
                  <h3>Add Bank</h3>
                  <form style={{ width: 400 }}>
                    <div className="col-md-12">

                      <div className="form-group">
                        <label>Bank Code</label>
                        <select className="form-control" name="bank_code" value={this.state.bank_code} onChange={this.handleChange}>
                          {
                            this.state.banks.map((bank, key) =>
                              <option key={key} value={bank.code}>{bank.name}</option>

                            )
                          }
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Account Number</label>
                        <input type="text" className="form-control" name="account_no" value={this.state.account_no} onChange={this.handleChange} />
                      </div>
                      <div className="form-group">
                        <label>Account Name</label>
                        <input type="text" className="form-control" value={this.state.account_name} disabled />
                      </div>
                      {this.state.account_name === "" ?
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={this.verifyBank}
                        >
                          Resolve
                      </button> :
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={this.submitBank}
                        >
                          Submit
                </button>}

                      <button className="btn btn-primary btn-link ml-2">
                        Cancel
                    </button>
                    </div>
                  </form>

                </Modal>

              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Profile;
