'use strict';

import React, {Component} from 'react';
import PlanActions from "../../js/actions/actions";

export default class Step7 extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    // not required as this component has no forms or user entry
    isValidated() {

        return new Promise((resolve, reject) => {
            let plansData = {
                // plan: this.state.plan,
                custom_name: this.props.getStore().custom_name,
                amount: this.props.getStore().amount,
                automatic_saving: JSON.parse(this.props.getStore().automatic_saving),
                saving_amount: this.props.getStore().saving_amount,
                payment_mode: this.props.getStore().payment_mode,
                maturity_date: this.props.getStore().maturity_date
            };
            PlanActions.createPlan(plansData, "lives").subscribe(resp => {
                let plan = resp.data.data
                console.log(plan)
                resolve()
                // window.location = "/dashboard/plans"
            })
        })
    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <table className="table">
                        <tbody>
                        <tr>
                            <td>
                                <label>Plan Name</label>
                                <input type="text" className="form-control-plaintext"
                                       value={this.props.getStore().custom_name} disabled/>
                            </td>
                            <td>
                                <label>Target Amount</label>
                                <input type="text" className="form-control-plaintext"
                                       value={this.props.getStore().amount} disabled/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Savings Amount</label>
                                <input type="text" className="form-control-plaintext"
                                       value={this.props.getStore().saving_amount} disabled/>
                            </td>
                            <td>
                                <label>Frequency</label>
                                <input type="text" className="form-control-plaintext"
                                       value={this.props.getStore().automatic_saving === "true" ? this.props.getStore().payment_mode : "N/A"}
                                       disabled/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Start Date</label>
                                <input type="text" className="form-control-plaintext"
                                       value={this.props.getStore().saving_amount} disabled/>
                            </td>
                            <td>
                                <label>Maturity Date</label>
                                <input type="text" className="form-control-plaintext"
                                       value={this.props.getStore().maturity_date} disabled/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Interest Rate p.a.</label>
                                <input type="text" className="form-control-plaintext" value={"10%"} disabled/>
                            </td>
                            <td>
                                <label>Automation</label>
                                <input type="checkbox" className="form-control-plaintext"
                                       defaultChecked={this.props.getStore().automatic_saving === "true"} disabled/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}