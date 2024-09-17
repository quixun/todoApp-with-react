import React from "react";
import { useNavigate } from "react-router-dom";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../contexts/AuthContext";
import styled from "styled-components";
import axios from "axios";

type ServerResponse = {
  accessToken: string;
}

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (response: CredentialResponse) => {
    const googleToken = response.credential;
    console.log("Google Token:", googleToken);
    navigate("/todo");

    if (googleToken) {
      try {
        const res = await axios.post<ServerResponse>(
          "https://c52c-117-2-155-123.ngrok-free.app/auth/google",
          {
            token: googleToken,
          }
        );

        const accessToken = res.data.accessToken;
        console.log("Access Token:", accessToken);

        login(accessToken); 
        navigate("/todo");
      } catch (error) {
        console.error("Error exchanging token:", error);
      }
    } else {
      console.error("Google token not available");
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
