import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import {
  Heading,
  Spacer,
  Button,
  InputText,
  Box,
  LayoutPageContainer,
} from "components";

const LoginBox = styled(Box)`
  width: 600px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const LoginButton = styled(Button)`
  align-self: flex-end;
`;

const Login = () => {
  const [isFormSent, setIsFormSent] = useState(false);
  const [username, setUsername] = useState("");

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsFormSent(true);
  };

  return isFormSent ? (
    <Redirect to={`/chat?username=${encodeURI(username)}`} />
  ) : (
    <LayoutPageContainer>
      <LoginBox>
        <Heading>Join chat</Heading>
        <Spacer spacing="lg" />
        <LoginForm onSubmit={handleFormSubmit}>
          <InputText
            label="Please enter your username"
            placeholder="username"
            onChange={handleUsernameChange}
            value={username}
            required
          />
          <Spacer spacing="lg" />
          <LoginButton type="submit">Next</LoginButton>
        </LoginForm>
      </LoginBox>
    </LayoutPageContainer>
  );
};

export default Login;
