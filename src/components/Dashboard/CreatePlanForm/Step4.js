'use strict';

import React, {Component} from 'react';
import PlanActions from "../../js/actions/actions";

export default class Step4 extends Component {
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
                maturity_date: this.props.getStore().maturity_date
            };
            PlanActions.createPlan(plansData, "fixeds").subscribe(resp => {
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
                                <label>Maturity Date</label>
                                <input type="text" className="form-control-plaintext"
                                       value={this.props.getStore().maturity_date} disabled/>
                            </td>
                            <td>
                                <label>Interest Rate p.a.</label>
                                <input type="text" className="form-control-plaintext" value={"10%"} disabled/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
