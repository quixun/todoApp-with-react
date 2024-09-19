import React from "react";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { loginRequest } from "../services/apiClient";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";

export const Login = () => {
  const dispatch = useDispatch();
  const { login } = useAuth();

  const handleLogin = async (response: CredentialResponse) => {
    const googleToken = response.credential;
    if (googleToken) {
      await loginRequest(googleToken, login, dispatch);
    } else {
      console.error("Google token is undefined");
    }
  };

  const handleLoginError = () => {
    console.log("Login failed");
  };

  return (
    <LoginContainer>
      <Title>Sign in with Google</Title>
      <GoogleLogin onSuccess={handleLogin} onError={handleLoginError} />
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f8f9fa;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
`;
