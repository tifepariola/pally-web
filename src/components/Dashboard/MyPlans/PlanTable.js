import React, { Component } from "react";
import { Link } from 'react-router-dom'
import './PlanTable.css';
class PlanTable extends Component {

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
    const { id, custom_name, fixed_amount, maturity, balance, plan_type } = this.props;
    // console.log(plan);
    return (
      <div className="col-xl-3 col-lg-6">
        <Link to={"/dashboard/plan/" + plan_type + "s/" + id}>
          <div className="card click-card widget-flat">
            <div className="card-body p-0">
              <div className="p-3 pb-0">
                <div className="float-right">
                  <i className="text-primary widget-icon fa fa-piggy-bank" />
                </div>
                <h6 className="text-muted font-weight-normal mt-0">{plan_type}</h6>
                <h4 className="text-muted font-weight-normal mt-0">
                  {custom_name}
                </h4>

                <h3 className="mt-2">&#8358;{this.formatMoney(balance ? balance : 0, 2, '.', ',')}</h3>
                <h6 className="text-muted font-weight-normal mb-0">
                  Maturity: <span className="text-primary">{maturity.split(" ")[0].split("T")[0]}</span> <br /> Target Amount: &#8358;{this.formatMoney(fixed_amount ? fixed_amount : 0, 2, '.', ',')}
                </h6>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default PlanTable;
