import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../layout/TextInputGroup";
import uuid from "uuid";
import axios from "axios";

class AddContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {}
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;

    var newErrors;

    if (name === "")
      newErrors = { ...newErrors, ...{ name: "Name is rewqirere" } };

    if (email === "")
      newErrors = { ...newErrors, ...{ email: "Emialler is rewqirere" } };

    if (phone === "")
      newErrors = { ...newErrors, ...{ phone: "Phoneer is rewqirere" } };

    if (newErrors) {
      this.setState({ errors: newErrors });
      return;
    }

    const newContact = {
      name,
      email,
      phone
    };

    //asynchronouse examples for adding

    // //axios example
    // const res = await axios.post(
    //   "https://jsonplaceholder.typicode.com/users",
    //   newContact
    // );

    // dispatch({ type: "ADD_CONTACT", payload: res.data });

    //fetch example
    const res = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newContact)
    }).then(response => response.json());
    dispatch({ type: "ADD_CONTACT", payload: res });

    //synchronouse examples for adding

    // //axios example
    // axios
    //   .post("https://jsonplaceholder.typicode.com/users", newContact)
    //   .then(res => dispatch({ type: "ADD_CONTACT", payload: res.data }));

    // //fetch example
    // fetch("https://jsonplaceholder.typicode.com/users", {
    //   method: "post",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(newContact)
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     dispatch({ type: "ADD_CONTACT", payload: data });
    //   });

    // Clear State
    this.setState({
      name: "",
      email: "",
      phone: "",
      errors: {}
    });

    this.props.history.push("/");
  };

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">
                Add AddContact
                <div className="card-body">
                  <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                    <TextInputGroup
                      label="Name"
                      name="name"
                      placeholder="Enter name..."
                      value={name}
                      onChange={this.onChange}
                      error={errors.name}
                    />
                    <TextInputGroup
                      label="Email"
                      type="email"
                      name="email"
                      placeholder="Enter email..."
                      value={email}
                      onChange={this.onChange}
                      error={errors.email}
                    />
                    <TextInputGroup
                      label="Phone"
                      name="phone"
                      placeholder="Enter phone..."
                      value={phone}
                      onChange={this.onChange}
                      error={errors.phone}
                    />
                    <input
                      type="submit"
                      className="btn btn-light btn-block"
                      value="Add Contact"
                    />
                  </form>
                </div>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
