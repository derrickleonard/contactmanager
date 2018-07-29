import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../layout/TextInputGroup";
//import uuid from "uuid";
import axios from "axios";

class EditContact extends Component {
  state = {
    id: -1,
    name: "",
    email: "",
    phone: "",
    errors: {}
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  //asynchronous examples
  async componentDidMount() {
    // //axios example
    // const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${this.props.match.params.id}`);
    // this.setState({ contacts: res.data });

    //fetch example

    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users/${this.props.match.params.id}`
    ).then(response => response.json());

    this.setState({
      id: res.id,
      name: res.name,
      email: res.email,
      phone: res.phone
    });
  }

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
      id: this.state.id,
      name,
      email,
      phone
    };

    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${this.state.id}`,
      newContact
    );
    dispatch({ type: "UPDATE_CONTACT", payload: res.data });

    // Clear State
    this.setState({
      id: -1,
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
                Edit Contact
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
                      value="Update Contact"
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

export default EditContact;
