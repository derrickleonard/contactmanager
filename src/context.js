import React, { Component } from "react";
import axios from "axios";

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter(c => c.id !== action.payload)
      };
    case "ADD_CONTACT":
      return { ...state, contacts: [action.payload, ...state.contacts] };
    case "UPDATE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.map(
          contact =>
            contact.id === action.payload.id
              ? (contact = action.payload)
              : contact
        )
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    contacts: [],
    dispatch: action => {
      this.setState(state => reducer(state, action));
    }
  };

  //asynchronous examples
  async componentDidMount() {
    // //axios example
    // const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    // this.setState({ contacts: res.data });

    //fetch example
    const res = await fetch("https://jsonplaceholder.typicode.com/users").then(
      response => response.json()
    );
    this.setState({ contacts: res });
  }

  //synchronous examples
  //   componentDidMount() {
  //     //axios example
  //     axios
  //       .get("https://jsonplaceholder.typicode.com/users")
  //       .then(res => this.setState({ contacts: res.data }));

  //     ////fetch example
  //     // fetch("https://jsonplaceholder.typicode.com/users")
  //     //   .then(response => response.json())
  //     //   .then(data => {
  //     //     this.setState({ contacts: data });
  //     //   });
  //   }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;