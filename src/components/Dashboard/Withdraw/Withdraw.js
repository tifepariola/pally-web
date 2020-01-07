import React, { Component } from "react";
import "./Withdraw.css";
import SelectListGroup from "../MyPlans/SelectListGroup";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

class Withdraw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plan: ""
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();

    const plansData = {
      plan: this.state.plan
    };
    console.log(plansData);
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
                      <li className="breadcrumb-item active">Withdraw</li>
                    </ol>
                  </div>
                  <h4 className="page-title">Withdraw</h4>
                </div>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-xl-4 offset-xl-4">
                <div className="card widget-flat">
                  <div className="card-body p-0">
                    <div className="p-3 pb-0">
                      <form>
                        <div className="form-group">
                          <label>Withdraw From</label>
                          <SelectListGroup
                            placeholder="Plan"
                            name="plan"
                            value={this.state.plan}
                            onChange={this.handleChange}
                            options={options1}
                          />
                        </div>
                        <div className="form-group">
                          <label>Amount</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                          <label>Bank</label>
                          <select className="form-control">
                            <option>Diamond Bank ****2019</option>
                          </select>
                        </div>
                        <button className="btn btn-primary" onClick={this}>
                          Withdraw
                        </button>
                        <button
                          className="btn btn-primary btn-link ml-2"
                          type="reset"
                        >
                          Reset
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Withdraw;
