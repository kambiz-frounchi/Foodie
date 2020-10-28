import React from "react";

// This file exports the Input, TextArea, and FormBtn components

export function Input(props) {
  return (
    <div className="form-group">
      <label htmlFor="exampleInputPassword1">{props.name}</label>
      <input {...props} className="form-control" />
    </div>
  );
}

export function PasswordInput(props) {
  console.log("Password");
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

export function UserEmailInput(props) {
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

export function FormBtn(props) {
  return (
    <button {...props} className="btn btn-success">
      {props.children}
    </button>
  );
}

export function CommonFormComponents(props) {
  return (
    <div>
      <UserEmailInput {...props} />
      <PasswordInput {...props} />
    </div>
  );
}

export function SignupForm(props) {
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

export function LoginForm(props) {
  return (
    <form className="login">
      <CommonFormComponents onChange={props.onChange}/>
      <FormBtn onClick={props.onClick}>login</FormBtn>
      <FormBtn onClick={props.onCreateNewUserClick}>Create New User</FormBtn>
    </form>
  );
}

export function LoginSignupForm(props) {
  console.log(props.signup);
  return props.signup ? <SignupForm {...props} /> : <LoginForm {...props} />;
}
