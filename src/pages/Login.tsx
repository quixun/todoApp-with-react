// Login.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from '../contexts/AuthContext'; // Updated import
import styled from "styled-components";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      login(); 
      navigate('/todo');
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  return (
    <LoginContainer>
      <Title>Sign in with Google</Title>
      <LoginButton onClick={() => handleLogin()}>
        <GoogleIcon src="/google-icon.png" alt="Google" />
        Sign in with Google
      </LoginButton>
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

const LoginButton = styled.button`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #4285f4;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #357ae8;
  }
`;

const GoogleIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;
