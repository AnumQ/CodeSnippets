import React, { createContext, useContext, useState } from "react";
import { User } from "../Models/User";

type UserType = User[];

export const useUsersContext = () => {
  return { ...useContext(UsersContext) };
};

const UsersContext = createContext<{
  items: UserType;
  setItems: React.Dispatch<React.SetStateAction<UserType>>;
}>(null!);

type Props = {
  children: JSX.Element;
};

export const UsersContextProvider = ({ children }: Props) => {
  const [items, setItems] = useState<UserType>([]);

  return (
    <UsersContext.Provider value={{ items, setItems }}>
      {children}
    </UsersContext.Provider>
  );
};
