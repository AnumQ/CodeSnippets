import React, { createContext, useContext, useEffect, useState } from "react";
import firebase from "firebase/app";
import { SessionService } from "../Services/SessionService";
import { log } from "../consoleHelper";

export const AuthUserContext = createContext<{
  authUser: firebase.User | null | undefined;
  setAuthUser: React.Dispatch<
    React.SetStateAction<firebase.User | null | undefined>
  >;
}>({
  authUser: undefined,
  setAuthUser: () => {
    //
  },
});

type Props = {
  children: JSX.Element;
};

export const useAuthUser = () => {
  const { authUser, setAuthUser } = useAuthUserContext();

  const fetchLogin = () => {
    if (authUser) {
      return authUser.email;
    } else {
      return "null";
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (authUser: firebase.User | null) => {
        if (!authUser) {
          setAuthUser(null);
        }
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  return { authUser, setAuthUser, fetchLogin };
};

export const AuthUserProvider = ({ children }: Props) => {
  const [authUser, setAuthUser] = useState<firebase.User | null | undefined>(
    null
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (authUser: firebase.User | null) => {
        if (authUser) {
          authUser.getIdToken(true).then((token: string) => {
            SessionService.setAuthIdToken(token);
          });
          setAuthUser(authUser);
        }
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthUserContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthUserContext.Provider>
  );
};

export const useAuthUserContext = () => {
  return { ...useContext(AuthUserContext) };
};
