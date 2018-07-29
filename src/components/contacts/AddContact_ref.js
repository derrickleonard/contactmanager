import React, { Component } from "react";
import { Consumer } from "../../context";
import { uuid } from "uuid";

class AddContact extends Component {
  constructor(props) {
    super(props);

    this.nameInput = React.createRef();
    this.emailInput = React.createRef();
    this.phoneInput = React.createRef();
  }

  onSubmit = (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;

    const newContact = {
      id: uuid(),
      name,
      email,
      phone
    };

    dispatch({ type: "ADD_CONTACT", payload: newContact });
  };

  static defaultProps = {
    name: "",
    email: "",
    phone: ""
  };

  render() {
    const { name, email, phone } = this.props;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">
                Add AddContact
                <div className="card-body">
                  <form onSubmit={this.onSubmit.bind(this, this.dispatch)}>
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Name...."
                        name="name"
                        defaultValue={name}
                        ref={this.nameInput}
                      />
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        placeholder="Enter email...."
                        name="email"
                        defaultValue={email}
                        ref={this.emailInput}
                      />
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter phone...."
                        name="phone"
                        defaultValue={phone}
                        ref={this.phoneInput}
                      />
                    </div>
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
