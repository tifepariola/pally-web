import React, { Component } from "react";
import "./MutualFunds.css";
import "./react-datetime.css";
import Header from "../Header/Header";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import history from "../../../history";
import "../../Dashboard/Auth/Login.css";
import SelectListGroup from "./SelectListGroup";
import { createPlan } from "../../js/actions/planActions";
import { getUser } from "../../js/actions/authActions";
import { getPlans } from "../../js/actions/planActions";
import { Link } from 'react-router-dom'
import PlanActions from "../../js/actions/actions";
import PlanItem from "./PlanItem";
import Modal from "react-responsive-modal";
import Spinner from "components/Spinner";
import PlanTable from "./PlanTable";
import Footer from "../Footer/Footer";
import Datetime from 'react-datetime';
import Cookie from "../../../utils/cookie";

class MutualFunds extends Component {
  componentWillMount() {
    if (!Cookie.getAuth()) {
      history.push("/dashboard/login");
    }

    // this.props.getPlans();
    this.props.getUser();
    let plan_list = [];
    PlanActions.getPlans().subscribe(resp => {
      console.log(resp.data)
      resp.data.map((plan) =>
        plan.plans.map((plan_item) => {
          plan_item.plan_type = plan.type
          plan_list.push(plan_item)
        })
      );
      this.setState({
        plans: plan_list,
        loading: false
      })
      console.log('hello', this.state.plans)

    })
    // this.setState({ plans: this.props.planContents })
  }

  constructor(props) {
    super(props);

    this.state = {
      auth: Cookie.getAuth(),
      show: false,
      open: false,
      display: "none",
      lives: "lives",
      savers: "savers",
      mode: "",
      plan: "lives",
      custom_name: "",
      amount: 0,
      type: "",
      target: "",
      payment_mode: "",
      duration: "",
      loading1: false,
      loading: true,
      maturity: "",
      plans: [],
      showPlans: []
    };
    this.filterPlans = this.filterPlans.bind(this);
    this.handleMaturityDate = this.handleMaturityDate.bind(this);

  }

  onCloseModal = () => {
    this.setState({ open: false });
  };
  onCloseModal1 = () => {
    this.setState({ open1: false });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(event)
  };
  handleMaturityDate(date) {

    this.setState({ maturityDate: date._d.toISOString().split("T")[0] });
  };

  handleSubmit = event => {
    event.preventDefault();

    // loading spinner
    this.setState({ loading1: true });

    let plansData = {
      // plan: this.state.plan,
      custom_name: this.state.custom_name,
      amount: this.state.amount,
      type: this.state.plan,
      payment_mode: this.state.payment_mode,
      maturity_date: this.state.maturityDate
    };

    if (this.state.plan === "lives") {
      plansData = {
        custom_name: this.state.custom_name,
        amount: parseInt(this.state.target),
        payment_mode: this.state.payment_mode,
        maturity_date: this.state.maturityDate,
        saving_amount: parseInt(this.state.amount),
        automatic_saving: this.state.payment_mode === "Pay as You Want" ? false : true
      };
    }

    console.log('plansdata', plansData);
    const plansType = this.state.plan;
    PlanActions.createPlan(plansData, plansType).subscribe(resp => {
      let plan = resp.data.data
      plan.plan_type = plansType
      console.log(plan)
      let plans = this.state.plans
      plans.push(plan)
      this.setState({ plans: plans, open: false, open1: true })
      console.log('all plans', this.state.plans)

      // window.location = "/dashboard/plans"
    })
  };

  filterPlans = (plan_type) => {
    let plans = this.state.plans
    plans.map((plan) => {
      if (plan_type == 'all') {
        plan.hidden = false
      }
      else if (plan.plan_type === plan_type) {
        plan.hidden = false
      } else {
        plan.hidden = true
      }
    })
    this.setState({
      plans: plans
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

  render() {
    const { show, open, open1 } = this.state;
    const { planTypes } = this.props.plan;
    var yesterday = Datetime.moment().subtract(1, 'day');
    var startValid = function (current) {
      return current.isAfter(yesterday);
    };
    var maturityDay = this.state.plan === 'fixeds' ?
    Datetime.moment().add(6, 'month') : Datetime.moment().add(3, 'month');
    var maturityValid = function (current) {
      return current.isAfter(maturityDay);
    };
    let showPlans;
    // let showTable;
    // let showXPlans;
    // let plans = [];
    // let xPlans = []
    // console.log('plans s', this.state.plans)
    // if (Array.isArray(planTypes)) {
    //   console.log(loading, planTypes)
    //   plans = planTypes
    //   // this.setState({plans: planTypes})
    //   console.log('plan ', plans);
    //   plans.map((x) => {
    //     x.plans.map((y) => {
    //       y.plan_type = x.type
    //       console.log('hello', y)
    //       this.state.plans.push(y)
    //       this.state.showPlans.push(y)
    //     })
    //   });
    //   showXPlans = xPlans.map((item, key) => item.hidden ? null : <PlanTable key={key}
    //     type={item.type}
    //     plan_type={item.plan_type}
    //     custom_name={item.plan_type !== 'jara' ? item.custom_name : item.name}
    //     fixed_amount={item.amount}
    //     created_at={item.created_at} />)
    // } else {
    //   showXPlans = <Spinner />
    // }

    // Select options for plans
    const options1 = [
      // { label: "Savers", value: "savers" },
      { label: "Life", value: "lives" },
      { label: "Fixed", value: "fixeds" },
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
    const { loading1 } = this.state;

    if (show) {
      showPlans = (
        <div>
          <Modal open={open} onClose={this.onCloseModal} center>
            <h3>Create Plan</h3>
            <form style={{ width: 400 }}>
              <div className="col-md-12">
                <div className="form-group">
                  <label>Plan Type</label>
                  <SelectListGroup
                    placeholder="Plan"
                    name="plan"
                    value={this.state.plan}
                    onChange={this.handleChange}
                    options={options1}
                  />
                </div>
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
                  <label>Savings Amount</label>
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
                  <label>Target Amount</label>
                  <input
                    placeholder="Target Amount"
                    name="target"
                    className="form-control"
                    type="number"
                    onChange={this.handleChange}
                    min="1"
                    step="1"

                  />
                </div>
                <div className="form-group" style={{
                  display:
                    this.state.plan !== "fixeds"
                      ? true
                      : 'none'
                }
                }>
                  <label>Savings Frequency</label>
                  <SelectListGroup
                    placeholder="Select"
                    name="payment_mode"
                    value={this.state.payment_mode}
                    onChange={this.handleChange}
                    options={options3}

                  />
                </div>
                <div className="form-group" style={{
                  display:
                    this.state.plan === "savers"
                      ? true
                      : 'none'
                }
                }>
                  <label>Plan Type</label>
                  <SelectListGroup
                    placeholder="Plan Type"
                    name="type"
                    value={this.state.type}
                    onChange={this.handleChange}
                    options={options2}

                  />
                </div>

                <div className="form-group" style={{
                  display:
                    this.state.plan === "lives"
                      ? true
                      : 'block'
                }
                }>
                  <label>Maturity Date</label>
                  <Datetime input={true} timeFormat={false} isValidDate={maturityValid} inputProps={{ placeholder: 'Click to select...' }} onChange={this.handleMaturityDate} />
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
                  Create
                    </button>
              </div>
            </form>

          </Modal>
          <Modal open={open1} onClose={this.onCloseModal1} center>
            <div style={{ width: 400 }}>
              <h4>Plan created successfully, What next?</h4>
              <Link to="/dashboard/save" className="btn btn-primary btn-block">Save Now</Link>
              <button className="btn btn-light btn-block" onClick={this.onCloseModal1}>Save Later</button>
            </div>
          </Modal>
        </div>
      );
    }

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
                      <li className="breadcrumb-item active">Investments</li>
                    </ol>
                  </div>
                  <h4 className="page-title">Mutual Funds</h4>
                </div>
              </div>
              <div className="col-12 mb-3">
                <button className={'btn btn-primary'}>Mutual Funds</button>
                <button className={'btn btn-link'}>Fixed Investments</button>
                <button className={'btn btn-link'}>Stocks</button>
              </div>
            </div>
            <div className="row mt-2">
            <div className="col-12 mb-3">
              <Link to={"/dashboard/buy-fund"} className="btn btn-primary">Buy Mutual Funds</Link>
              <div className="float-right">
                <a href="javascript:void(0)" onClick={(e) => this.filterPlans('all')}>All</a> / &nbsp;
                <a href="javascript:void(0)" onClick={(e) => this.filterPlans('fixed')}>Low Risk</a> / &nbsp;
                <a href="javascript:void(0)" onClick={(e) => this.filterPlans('saver')}>Medium Risk</a> / &nbsp;
                <a href="javascript:void(0)" onClick={(e) => this.filterPlans('life')}>High Risk</a>
              </div>
            </div>
            </div>

            <div className="row mt-2">
              <div className="col-md-4">
                <Link to={"/dashboard/view-fund"}>
                  <div className="card">
                    <div className="card-header border-0">
                      <h4 className="float-left"><span className="badge badge-primary">United Capital</span></h4>
                      <h4 className={'float-right text-success'}><i className={'fa fa-chevron-up'}></i> 12.5%</h4>

                    </div>
                    <div className="card-body">
                      <div className={'row'}>
                        <div className={'col-lg-8'}>
                          <h4>My Mutual Fund</h4>
                          <h2>&#8358;{this.formatMoney(0, 2, '.', ',')}</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-4">
                <Link to={"/dashboard/view-fund"}>
                  <div className="card">
                    <div className="card-header border-0">
                      <h4 className="float-left"><span className="badge badge-primary">United Capital</span></h4>
                      <h4 className={'float-right text-success'}><i className={'fa fa-chevron-up'}></i> 12.5%</h4>

                    </div>
                    <div className="card-body">
                      <div className={'row'}>
                        <div className={'col-lg-8'}>
                          <h4>My Mutual Fund</h4>
                          <h2>&#8358;{this.formatMoney(0, 2, '.', ',')}</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-4">
                <Link to={"/dashboard/view-fund"}>
                  <div className="card">
                    <div className="card-header border-0">
                      <h4 className="float-left"><span className="badge badge-primary">United Capital</span></h4>
                      <h4 className={'float-right text-success'}><i className={'fa fa-chevron-up'}></i> 12.5%</h4>

                    </div>
                    <div className="card-body">
                      <div className={'row'}>
                        <div className={'col-lg-8'}>
                          <h4>My Mutual Fund</h4>
                          <h2>&#8358;{this.formatMoney(0, 2, '.', ',')}</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div >
    );
  }
}

MutualFunds.propTypes = {
  createPlan: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  getPlans: PropTypes.func.isRequired,
  plan: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  planContent: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  plan: state.plan,
  isAuthenticated: state.isAuthenticated,
  user: state.user
});
export default connect(
  mapStateToProps,
  { createPlan, getUser, getPlans }
)(withRouter(MutualFunds));
