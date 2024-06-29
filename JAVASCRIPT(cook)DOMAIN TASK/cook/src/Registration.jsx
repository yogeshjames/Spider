import React, { Component } from 'react';
import axios from 'axios';

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
        console.log(1);
      axios.post(`http://localhost:3000/register`, {
        email: email,
        password: password
      })
        .then(response => {
            console.log(32423)
          this.setState({ heading: 'Registration Successful' });
        })
        .catch(error => {
          console.error('Registration error:', error);
          this.setState({ heading: 'Registration Failed' }); 
        });
    } else {
        console.log(2);
      this.setState({ heading: 'Enter Email and Password' });
    }
  };

  render() {
    const { firstName, lastName, email, password, heading } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <h3>{heading}</h3>
        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            name="firstName"
            value={firstName}
            onChange={this.handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Last name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            name="lastName"
            value={lastName}
            onChange={this.handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            {heading}
          </button>
        </div>
      </form>
    );
  }
}
