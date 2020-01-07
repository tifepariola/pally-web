import React, { Component } from "react";
import { getPlans } from "../../js/actions/planActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
//import FixedTable from "./FixedTable";

class FixedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fixed: []
    };
  }
  componentDidMount() {
    this.setState({ fixed: this.props.plan });

    // this.props.getPlans();

    console.log(this.props);
  }
  // componentWillMount() {
  //   this.props.getPlans();
  // }
  render() {
    // let dom = this.state.fixed;

    //let chars = dom.planTypes["fixed"];

    return <div>srfrrs</div>;
    // chars.map(char => (
    //   <FixedTable
    //     key={char.id}
    //     custom_name={char.custom_name}
    //     fixed_amount={char.amount}
    //     created_at={char.created_at}
    //   />
    // ));
  }
}

FixedItem.propTypes = {
  getPlans: PropTypes.func.isRequired,
  plan: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  plan: state.plan
});
export default connect(
  mapStateToProps,
  { getPlans }
)(withRouter(FixedItem));
