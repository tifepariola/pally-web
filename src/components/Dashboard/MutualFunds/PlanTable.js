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
        <div className="col-md-4">
            <Link to={"/dashboard/plan/" + plan_type + "s/" + id}>
            <div className="card">
              <div className="card-header border-0">
                <h4 className="float-left"><span className="badge badge-primary">{plan_type}</span></h4>
              </div>
              <div className="card-body">
                <div className={'row'}>
                <div className={'col-lg-8'}>
                  <h4>{custom_name}</h4>
                  <h2>&#8358;{this.formatMoney(balance ? balance : 0, 2, '.', ',')}</h2>
                  <small>Maturity Date: {maturity.split(" ")[0].split("T")[0]}</small>
                  {/*&#8358;{this.formatMoney(fixed_amount ? fixed_amount : 0, 2, '.', ',')}*/}
                </div>
                <div className={'col-lg-4 border-left'}>
                  <h4 className={'text-success'}><i className={'fa fa-chevron-up'}></i> 12.5%</h4>
                </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
    );
  }
}

export default PlanTable;
