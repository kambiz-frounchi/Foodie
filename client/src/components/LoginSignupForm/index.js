import React from "react";

function Input(props) {
  return (
    <div className="form-group">
      <label htmlFor="exampleInputPassword1">{props.name}</label>
      <input {...props} className="form-control" />
    </div>
  );
}

function PasswordInput(props) {
  return (
    <div className="form-group">
      <label htmlFor="exampleInputPassword1">Password</label>
      <input
        {...props}
        name="password"
        type="password"
        className="form-control"
        id="password-input"
        placeholder="Password (required)"
      />
    </div>
  );
}

function UserEmailInput(props) {
  console.log("UserEmail");
  return (
    <div className="form-group">
      <label htmlFor="exampleInputEmail1">Email address</label>
      <input
        {...props}
        name="email"
        type="email"
        className="form-control"
        id="email-input"
        placeholder="Email (required)"
      />
    </div>
  );
}

function FormBtn(props) {
  return (
    <button {...props} className="btn btn-success">
      {props.children}
    </button>
  );
}

function CommonFormComponents(props) {
  return (
    <div>
      <UserEmailInput {...props} />
      <PasswordInput {...props} />
    </div>
  );
}

function SignupForm(props) {
  return (
    <form className="signup">
      <Input
        onChange={props.onChange}
        name="nickname"
        placeholder="nickname (required)"
      />
      <CommonFormComponents onChange={props.onChange} />
      <FormBtn onClick={props.onClick}>signup</FormBtn>
    </form>
  );
}

function LoginForm(props) {
  return (
    <form className="login">
      <CommonFormComponents onChange={props.onChange} />
      <FormBtn onClick={props.onClick}>login</FormBtn>
      <FormBtn onClick={props.onCreateNewUserClick}>Create New User</FormBtn>
    </form>
  );
}

export function LoginSignupForm(props) {
  console.log(props.signup);
  return props.signup ? <SignupForm {...props} /> : <LoginForm {...props} />;
}
