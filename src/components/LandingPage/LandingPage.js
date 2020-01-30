import React from 'react';
import Slider from "react-slick";
import { Link } from 'react-router-dom'
import './LandingPage.css';
import $ from 'jquery';
import welcome_img from './img/bg-img/welcome-img.png'
import special from './img/bg-img/special.png'
import video from './img/bg-img/video.jpg'
import logo from './img/logo.png'
import './img/bg-img/welcome-bg.png'

export default class LandingPage extends React.Component {
  componentDidMount() {
    $('#preloader').fadeOut('slow', function () {
      $(this).remove();
    });
  }
  render() {
    var settings = {
      dots: true,
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    var year = new Date().getFullYear();
    return (

      <div>
        <div id="preloader">
          <div className="colorlib-load"></div>
        </div>

        <header className="header_area animated">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-12 col-lg-8">
                <div className="menu_area">
                  <nav className="navbar navbar-expand-lg navbar-light">
                    <a className="navbar-brand" href="/">
                      <img src={logo} alt="OnePally" height="30" style={{ marginTop: -15 }} />
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ca-navbar" aria-controls="ca-navbar" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="ca-navbar">
                      <ul className="navbar-nav mr-auto" id="nav">
                        <li className="nav-item active"><a className="nav-link" href="#home">Home</a></li>
                        <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
                        <li className="nav-item"><a className="nav-link" href="#features">Features</a></li>
                        <li className="nav-item"><a className="nav-link" href="#testimonials">Testimonials</a></li>
                        <li className="nav-item"><a className="nav-link" href="#team">Company</a></li>
                        <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
                      </ul>
                      <div className="sing-up-button d-lg-none">
                        <Link to="/dashboard/login">Sign In</Link>
                        <Link to="/dashboard/register">Start Saving</Link>
                      </div>
                    </div>
                  </nav>
                </div>
              </div>
              <div className="col-12 col-lg-4">
                <div className="sing-up-button d-none d-lg-block">
                  <Link to="/dashboard/login">Sign In</Link>
                  <Link to="/dashboard/register">Start Saving</Link>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="wellcome_area clearfix" id="home">
          <div className="container h-100">
            <div className="row h-100 align-items-center">
              <div className="col-12 col-md col-md-8" style={{ bottom: 50 }}>
                <div className="wellcome-heading">
                  <h2>Group Savings</h2>
                  <h3>P</h3>
                  <p>Pallymate is the one app to help you plan, save, invest in things that matter and reduce annoying bills.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="welcome-thumb wow fadeInDown" data-wow-delay="0.5s">
            <img src={welcome_img} alt="" />
          </div>
        </section>

        <section className="special-area bg-white section_padding_100" id="about">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="section-heading text-center">
                  <h2>Why Pallymate?</h2>
                  <div className="line-shape"></div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-md-4">
                <div className="single-special text-center wow fadeInUp" data-wow-delay="0.2s">
                  <div className="single-icon">
                    <i className="ti-mobile" aria-hidden="true"></i>
                  </div>
                  <h4>Bank-grade Security</h4>
                  <p>Our payment processors are 128+ bit encrypted to ensure optimum security of your data electronically.</p>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="single-special text-center wow fadeInUp" data-wow-delay="0.4s">
                  <div className="single-icon">
                    <i className="ti-settings" aria-hidden="true"></i>
                  </div>
                  <h4>Powerful Savings Engine</h4>
                  <p>Automatically stash your cash with cutting edge tech that always remembers what you can afford to put away and saves money automatically.</p>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="single-special text-center wow fadeInUp" data-wow-delay="0.6s">
                  <div className="single-icon">
                    <i className="ti-lock" aria-hidden="true"></i>
                  </div>
                  <h4>Easy to use</h4>
                  <p>We build pretty complex tools and turn make them into simple models that anyone can maximise without getting their hands dirty.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="special_description_area mt-150">
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <div className="special_description_img">
                    <img src={special} alt="" />
                  </div>
                </div>
                <div className="col-lg-6 col-xl-5 ml-xl-auto">
                  <div className="special_description_content">
                    <h2>The Best App That Powers Group Savings!</h2>
                    <p>With every Nigerian in mind, made by and for Nigerians, we have built a platform that migrates traditional means of savings passed from generations past into the 21st century. Pallymate group savings allows for any number of people to pool resources together for maximum financial impact.</p>
                    <div className="app-download-area">
                      <div className="app-download-btn wow fadeInUp" data-wow-delay="0.2s">
                        <a href="/">
                          <i className="fa fa-android"></i>
                          <p className="mb-0"><span>available on</span> Google Store</p>
                        </a>
                      </div>
                      <div className="app-download-btn wow fadeInDown" data-wow-delay="0.4s">
                        <a href="/">
                          <i className="fa fa-apple"></i>
                          <p className="mb-0"><span>available on</span> Apple Store</p>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="awesome-feature-area bg-white section_padding_100 clearfix" id="features">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="section-heading text-center">
                  <h2>Awesome Features</h2>
                  <div className="line-shape"></div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-sm-6 col-lg-4">
                <div className="single-feature">
                  <i className="ti-user" aria-hidden="true"></i>
                  <h5>Awesome Experience</h5>
                  <p>We make sure your experience using our platform is one you’ll cherish with features made specially for the every you.</p>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-4">
                <div className="single-feature">
                  <i className="ti-pulse" aria-hidden="true"></i>
                  <h5>Fast and Simple</h5>
                  <p>Pallymate has been built for the user on the go, with superfast and intuitive user experience to take you from spender to saver without sweating.</p>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-4">
                <div className="single-feature">
                  <i className="ti-dashboard" aria-hidden="true"></i>
                  <h5>Automatic savings</h5>
                  <p>Every few days, Pallymate does the maths and transfers the perfect amount from your bank account. Little by little, it adds up.</p>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-4">
                <div className="single-feature">
                  <i className="ti-palette" aria-hidden="true"></i>
                  <h5>Transparency</h5>
                  <p>Easily monitor the progress of your investments from your Pallymate dashboard. Investors learn exactly which companies they own through their investments.</p>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-4">
                <div className="single-feature">
                  <i className="ti-crown" aria-hidden="true"></i>
                  <h5>Connect with all major banks</h5>
                  <p>Pallymate securely connects with all major Nigerian banks making sure you are not left out.</p>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-4">
                <div className="single-feature">
                  <i className="ti-headphone" aria-hidden="true"></i>
                  <h5>Humans on hand</h5>
                  <p>Our customer support team is ready and eager to help you, Monday to Saturday.</p>
                </div>
              </div>
            </div>

          </div>
        </section>


        <section className="cool_facts_area clearfix">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-3 col-lg-3">
                <div className="single-cool-fact d-flex justify-content-center wow fadeInUp" data-wow-delay="0.2s">
                  <div className="counter-area">
                    <h3><span className="counter">90</span></h3>
                  </div>
                  <div className="cool-facts-content">
                    <i className="ion-md-download"></i>
                    <p>APP <br /> DOWNLOADS</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-3 col-lg-3">
                <div className="single-cool-fact d-flex justify-content-center wow fadeInUp" data-wow-delay="0.4s">
                  <div className="counter-area">
                    <h3><span className="counter">120</span></h3>
                  </div>
                  <div className="cool-facts-content">
                    <i className="ion-ios-happy"></i>
                    <p>Happy <br /> Clients</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-3 col-lg-3">
                <div className="single-cool-fact d-flex justify-content-center wow fadeInUp" data-wow-delay="0.6s">
                  <div className="counter-area">
                    <h3><span className="counter">40</span></h3>
                  </div>
                  <div className="cool-facts-content">
                    <i className="ion-ios-person"></i>
                    <p>ACTIVE <br />ACCOUNTS</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-3 col-lg-3">
                <div className="single-cool-fact d-flex justify-content-center wow fadeInUp" data-wow-delay="0.8s">
                  <div className="counter-area">
                    <h3><span className="counter">10</span></h3>
                  </div>
                  <div className="cool-facts-content">
                    <i className="ion-ios-star-outline"></i>
                    <p>TOTAL <br />APP RATES</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section className="clients-feedback-area bg-white section_padding_100 clearfix" id="testimonials">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-10">
                <div className="client-feedback-text text-center">
                  <div className="client">
                    <i className="fa fa-quote-left" aria-hidden="true"></i>
                  </div>
                  <Slider {...settings}>
                    <div className="row">
                      <div className="col-12 col-md-4 testimonial">
                        <div className="card">
                          <div className="card-body">
                            <div className="client-description text-center">
                              <p>“ I have been using pallymate for a number of years. ”</p>
                            </div>
                            <div className="star-icon text-center">
                              <i className="ion-ios-star"></i>
                              <i className="ion-ios-star"></i>
                              <i className="ion-ios-star"></i>
                              <i className="ion-ios-star"></i>
                              <i className="ion-ios-star"></i>
                            </div>
                            <div className="client-name text-center">
                              <h5>Tosin Daniels</h5>
                              <p>Engineer</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-4 testimonial">
                        <div className="card">
                          <div className="card-body">
                            <div className="client-description text-center">
                              <p>“ I have been using pallymate for a number of years. ”</p>
                            </div>
                            <div className="star-icon text-center">
                              <i className="ion-ios-star"></i>
                              <i className="ion-ios-star"></i>
                              <i className="ion-ios-star"></i>
                              <i className="ion-ios-star"></i>
                              <i className="ion-ios-star"></i>
                            </div>
                            <div className="client-name text-center">
                              <h5>Tosin Daniels</h5>
                              <p>Engineer</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-4 testimonial">
                        <div className="card">
                          <div className="card-body">
                            <div className="client-description text-center">
                              <p>“ I have been using pallymate for a number of years. ”</p>
                            </div>
                            <div className="star-icon text-center">
                              <i className="ion-ios-star"></i>
                              <i className="ion-ios-star"></i>
                              <i className="ion-ios-star"></i>
                              <i className="ion-ios-star"></i>
                              <i className="ion-ios-star"></i>
                            </div>
                            <div className="client-name text-center">
                              <h5>Tosin Daniels</h5>
                              <p>Engineer</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="our-monthly-membership section_padding_50 clearfix">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-8">
                <div className="membership-description">
                  <h2>Saving Made Easy</h2>
                  <p>Create a Pallymate account in 3 minutes and start saving, with friends.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="get-started-button wow bounceInDown" data-wow-delay="0.5s">
                  <a href="/">Get Started</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="footer-contact-area section_padding_100 clearfix" id="contact">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="section-heading">
                  <h2>Get in touch with us!</h2>
                  <div className="line-shape"></div>
                </div>
                <div className="footer-text">
                  <p>Do feel free to contact us or just send in your queries in the form to the right and we will respond to you as soon as possible.</p>
                </div>
                <div className="address-text">
                  <p><span>Address:</span> Lagos, Nigeria</p>
                </div>
                <div className="phone-text">
                  <p><span>Phone:</span> +234 (0) 80 5508 9122</p>
                </div>
                <div className="email-text">
                  <p><span>Email:</span> hello@pallymate.com</p>
                </div>
                <div className="footer-social-icon">
                  <a href="/"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                  <a href="/"><i className="active fa fa-twitter" aria-hidden="true"></i></a>
                  <a href="/"> <i className="fa fa-instagram" aria-hidden="true"></i></a>
                  <a href="/"><i className="fa fa-google-plus" aria-hidden="true"></i></a>
                </div>
              </div>
              <div className="col-md-6">
                <div className="contact_from">
                  <form action="#" method="post">
                    <div className="contact_input_area">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <input type="text" className="form-control" name="name" id="name" placeholder="Your Name" required />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <input type="email" className="form-control" name="email" id="email" placeholder="Your E-mail" required />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group">
                            <textarea name="message" className="form-control" id="message" cols="30" rows="4" placeholder="Your Message *" required></textarea>
                          </div>
                        </div>
                        <div className="col-12">
                          <button type="submit" className="btn submit-btn">Send Now</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="footer-social-icon text-center section_padding_70 clearfix">
          <div className="footer-text">
            <h2>Pm.</h2>
          </div>
          <div className="footer-menu">
            <nav>
              <ul>
                <li><a href="/">About</a></li>
                <li><a href="/">Terms &amp; Conditions</a></li>
                <li><a href="/">Privacy Policy</a></li>
              </ul>
            </nav>
          </div>
          <div className="copyright-text">
            <p>Copyright &copy; { year } Pallymate</p>
          </div>
        </footer>
      </div>
    );
  }
}
