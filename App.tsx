import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Login } from "./Components/Login/Login";
import { Spinner } from "./Components/UI/Spinner";
import { APP_STATE } from "./Constants";
import { Main } from "./Components/Main/Main";
import { AuthUserProvider } from "./Contexts/AuthUserContext";
import { ProjectsContextProvider } from "./Contexts/ProjectsContext";
import { UsersContextProvider } from "./Contexts/UsersContext";

function App() {
  const [currentState, setCurrentState] = useState(APP_STATE.LOADING);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setCurrentState(APP_STATE.MAIN);
      } else {
        setCurrentState(APP_STATE.LOGIN);
      }
    });
  }, []);

  const AppLogic = () => {
    switch (currentState) {
      case APP_STATE.LOGIN:
        return <Login />;
      case APP_STATE.MAIN:
        return <Main />;
      default:
        return <Spinner />;
    }
  };
  return (
    <Container>
      <AuthUserProvider>
        <UsersContextProvider>
          <ProjectsContextProvider>
            <AppLogic />
          </ProjectsContextProvider>
        </UsersContextProvider>
      </AuthUserProvider>
    </Container>
  );
}

export default App;
