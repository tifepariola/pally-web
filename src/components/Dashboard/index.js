import React from "react";
import "./Dashboard.css";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import ForgotPass from "./Auth/ForgotPass";
import SaveNow from "./SaveNow/SaveNow";
import MyPlans from "./MyPlans/MyPlans";
import Withdraw from "./Withdraw/Withdraw";
import { Provider } from "react-redux";
import store from "../js/store";
import Profile from "./Profile/Profile";
import PlanDetail from "./MyPlans/PlanDetail";
import CreatePlan from "./CreatePlan/CreatePlan";
import PlanForm from "./PlanForm/PlanForm";
import ViewPlan from "./ViewPlan/ViewPlan";
import CreatePlanForm from "./CreatePlanForm/CreatePlanForm";

function Index() {
  
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route path="/dashboard/login" component={Login} />
        <Route path="/dashboard/register" component={Register} />
        <Route path="/dashboard/profile" component={Profile} />
        <Route path="/dashboard/forgot" component={ForgotPass} />
        <Route path="/dashboard/save" component={SaveNow} />
        <Route path="/dashboard/plans" component={MyPlans} />
        <Route path="/dashboard/create" component={CreatePlan} />
        <Route path="/dashboard/create-plan" component={CreatePlanForm} />
        <Route path="/dashboard/edit" component={PlanForm} />
        <Route path="/dashboard/view" component={ViewPlan} />
        <Route path="/dashboard/plan/:plan_type/:id" component={PlanDetail} />
        <Route path="/dashboard/withdraw" component={Withdraw} />
      </Router>
    </Provider>
  );
}

export default Index;
