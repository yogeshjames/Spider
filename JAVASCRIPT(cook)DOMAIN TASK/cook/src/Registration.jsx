import React, { Component } from 'react';
import axios from 'axios';
import './App.css'; 

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      heading: 'Sign Up' // Initialize heading in state
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    if (email !== '' && password !== '') {
      axios.post(`http://localhost:3000/register`, {
        email: email,
        password: password
      })
        .then(response => {
          this.setState({ heading: 'Registration Successful' });
        })
        .catch(error => {
          console.error('Registration error:', error);
          this.setState({ heading: 'Registration Failed' });
        });
    } else {
      this.setState({ heading: 'Enter Email and Password' });
    }
  };

  render() {
    const { firstName, lastName, email, password, heading } = this.state;

    return (
      <div className="signup-form-container">
        <form onSubmit={this.handleSubmit} className="signup-form">
          <h2>{heading}</h2>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              value={firstName}
              onChange={this.handleChange}
              placeholder="First Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              value={lastName}
              onChange={this.handleChange}
              placeholder="Last Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
              placeholder="Enter Email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              placeholder="Enter Password"
            />
          </div>
          <button type="submit" className="submit-btn">
            {heading}
          </button>
        </form>
      </div>
    );
  }
}
