import React from "react";
import firebase from "firebase/app";
import { Button, Row } from "react-bootstrap";
import { FaGoogle } from "react-icons/fa";
import { auth } from "../../iSnittFirebase";
import styled from "styled-components";
import logo from "./../../logo.png";
import { ISNITT_COLORS } from "../../Constants";
import { useAuthUser } from "../../Contexts/AuthUserContext";
import { UserService } from "../../Services/UserService";

const LoginButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem;
`;

const LogoContainer = styled.div`
  padding: 2rem;
  text-align: center;
`;

const LoginContainer = styled.div`
  background-color: "#ffffff";
  min-height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: rgb(0, 0, 0);
`;

export const Login = () => {
  const { setAuthUser } = useAuthUser();
  const handleLogIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    auth
      .signInWithPopup(provider)
      .then(function (result: firebase.auth.UserCredential) {
        if (!result.credential) return;

        const user = result.user;
        if (!user) return console.error("User is null");

        if (user && isUserValid(user, result)) {
          setAuthUser(user);
          UserService.createUser(user);
        } else {
          // TODO: log to functions here.
          alert(noAccessAlert);
          auth.signOut();
        }
      });
  };

  const LoginButton = () => {
    return (
      <>
        <Button
          style={{ background: ISNITT_COLORS.BUTTON_BACKGROUND }}
          size={"lg"}
          variant="secondary"
          onClick={() => {
            handleLogIn();
          }}
        >
          <div style={{ display: "flex" }}>
            <div
              style={{
                width: "2rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FaGoogle />
            </div>
            <div style={{ background: "none" }}>Sign in with Google</div>
          </div>
        </Button>
      </>
    );
  };

  return (
    <>
      <LoginContainer>
        <LogoContainer>
          <img width={"30%"} height={"30%"} src={logo} alt="logo" />
        </LogoContainer>
        <h1 style={{ color: ISNITT_COLORS.TEXT_COLOR }}>
          Welcome to iSnitt Portal
        </h1>
        <LoginButtonContainer>
          <LoginButton />
        </LoginButtonContainer>
      </LoginContainer>
    </>
  );
};

function parseJwt(token: string) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

function isUserValid(
  user: firebase.User,
  result: firebase.auth.UserCredential
) {
  const authCredentials = result.credential as firebase.auth.OAuthCredential;
  const idTokenGoogle = authCredentials.idToken;
  if (!idTokenGoogle) return console.error("idToken is null");
  const decryptToken = parseJwt(idTokenGoogle);
  const hd = decryptToken["hd"];

  // Domain authorization
  if (hd === "XXXXXX") return true;

  const email = user.email;
  if (!email) return false;

  return false;
}

const noAccessAlert =
  "Sorry you don't have access to the app. Please contact the administrator.";
