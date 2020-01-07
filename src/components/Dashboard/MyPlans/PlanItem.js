import React, { Component } from "react";
import PlanTable from "./PlanTable";
// import FixedTable from "./FixedTable";
//import LifeTable from "./LifeTable";

class PlanItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plans: []
      // savers: [],
      // fixed: [],
      // lives: []
    };
  }
  componentDidMount() {
    this.setState({
      plans: this.props.planContents
      // savers: this.props.planContents["savers"],
      // fixed: this.props.planContents["fixed"],
      // lives: this.props.planContents["lives"]
    });
    console.log(this.props);
  }
  render() {
    const plan = this.state.plans;
    console.log(plan);
    // const fixes = this.state.fixed;
    //const lives = this.state.lives;
    

    return <PlanTable
          key={plan.id}
          type={plan.type}
          custom_name={plan.custom_name}
          plans = {plan}
          fixed_amount={plan.amout}
          created_at={plan.created_at}
        />
      
      // lives.map(life => (
      //   <LifeTable
      //     key={life.id}
      //     custom_name={life.custom_name}
      //     fixed_amount={life.amount}
      //     created_at={life.created_at} (<div>sfvljilm</div>)
      //   />
      // ))
    
  }
}

export default PlanItem;
