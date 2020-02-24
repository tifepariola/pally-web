import React, { Component } from "react";

class FixedTable extends Component {
  render() {
    const { custom_name, fixed_amount, created_at } = this.props;
    return (
      <div className="col-xl-3 col-lg-6">
        <div className="card widget-flat">
          <div className="card-body p-0">
            <div className="p-3 pb-0">
              <div className="float-right">
                <i className="text-danger widget-icon fa fa-piggy-bank" />
              </div>
              <h2 className="text-muted font-weight-normal mt-0">Fixed Plan</h2>
              <h5 className="text-muted font-weight-normal mt-0">
                {custom_name}
              </h5>
              <h3 className="mt-2">&#8358;{fixed_amount}</h3>
              <h6 className="text-muted font-weight-normal mb-0">
                Locked * <span className="text-primary">{created_at}</span>
              </h6>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FixedTable;
