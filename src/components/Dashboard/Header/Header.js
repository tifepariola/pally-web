import React from 'react';
import './Header.css'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/images/logo.png'
import logosm from '../assets/images/logo-sm.png'
import UserActions from '../../js/actions/userActions';
import MenuItems from './MenuItems';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobile_menu: false,
            user: JSON.parse(localStorage.getItem('user'))
        }
        this.openMenu = this.openMenu.bind(this);
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
    componentWillMount() {
        UserActions.getUser().subscribe(userData => {
            let user = userData.data.data
            user.jara = userData.data.jara[0]
            console.log(user)
            localStorage.setItem('user', JSON.stringify(user))
            this.setState({ user: user })
        })
        console.log('format money ', this.formatMoney(556711.02, 2, '.', ','))
    }
    openMenu() {
        this.setState({ mobile_menu: !this.state.mobile_menu })
    }
    logout() {
        localStorage.clear();
        window.location = "/dashboard/login"
    }
    render() {
        return (
            <header id="topnav">
                <nav className="navbar-custom">

                    <div className="container-fluid">
                        <ul className="list-unstyled topbar-right-menu float-right mb-0">

                            <li className="dropdown notification-list">
                                <button className={this.state.mobile_menu ? "navbar-toggle nav-link open" : "navbar-toggle nav-link"} onClick={this.openMenu}>
                                    <div className="lines">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </button>
                            </li>


                            <li className="dropdown notification-list">
                                <a className="nav-link dropdown-toggle nav-user mr-0" data-toggle="dropdown" href="/"
                                    role="button" aria-haspopup="false" aria-expanded="false">
                                    {/* <img src="assets/images/users/avatar-1.jpg" alt="user-image" className="rounded-circle" /> */}
                                    <small className="pro-user-name ml-1">
                                       Hi {this.state.user.first_name}
                                    </small>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right dropdown-menu-animated profile-dropdown ">
                                    <div className="dropdown-header noti-title">
                                        <h6 className="text-overflow m-0">Welcome !</h6>
                                    </div>

                                    <Link to="/dashboard/profile" className="dropdown-item notify-item">
                                        <i className="fe-user"></i>
                                        <span>My Account</span>
                                    </Link>


                                    <div className="dropdown-divider"></div>

                                    <button onClick={this.logout} className="dropdown-item notify-item">
                                        <i className="fe-log-out"></i>
                                        <span>Logout</span>
                                    </button>

                                </div>
                            </li>

                        </ul>

                        <ul className="list-inline menu-left mb-0">
                            <li className="">
                                <a href="/" className="logo">
                                    <span className="logo-lg">
                                        <img src={logo} alt="" height="25" />
                                    </span>
                                    <span className="logo-sm">
                                        <img src={logosm} alt="" height="28" />
                                    </span>
                                </a>
                            </li>
                            
                        </ul>
                    </div>

                </nav>

                <div className="topbar-menu">
                    <div className="container-fluid">
                        <div id="navigation" style={{ display: this.state.mobile_menu ? 'block' : 'none' }}>
                            <ul className="navigation-menu">

                                <li className="has-submenu">
                                    <NavLink exact={true} to="/dashboard" activeClassName="active">
                                        <i className="fe-airplay"></i>
                                        Dashboard
                                    </NavLink>
                                </li>
                                {
                                    MenuItems.map((menuitem, index) => (
                                        <li className="has-submenu" key={index}>
                                            <NavLink to={menuitem.link} activeClassName="active">
                                                <i className={menuitem.icon}></i>
                                                {menuitem.title}
                                            </NavLink>
                                        </li>
                                    ))
                                }
                                <li className="" style={{ float: "right" }}>
                                    <NavLink to="/dashboard/withdraw">
                                        <i className="dripicons-wallet"></i>&#8358;{this.formatMoney(this.state.user.jara.current_balance, 2, '.', ',')}
                                    </NavLink>
                                </li>

                            </ul>

                            <div className="clearfix"></div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}