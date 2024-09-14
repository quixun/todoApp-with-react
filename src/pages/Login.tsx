// Login.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../contexts/AuthContext"; // Updated import
import styled from "styled-components";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (response: CredentialResponse) => {
    console.log(response.credential);
    login(response);
    navigate("/todo");
  };

  const handleLoginError = () => {
    console.log("login failed");
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
