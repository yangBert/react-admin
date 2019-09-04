import React from 'react';
import { withRouter } from 'react-router'

function Login (props) {
  function login() {
    props.history.push("/pages/userList");
  }
  return (
    <button onClick={login}>login</button>
  )
}
// class Login extends React.Component {
//   componentDidMount() {

//   }

//   render() {
//     return (
//       <div>login</div>
//     )
//   }
// }
export default withRouter(Login);
