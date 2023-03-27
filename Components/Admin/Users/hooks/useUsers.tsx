import React, { useContext, useEffect, useState } from "react";
import { UserService } from "../../../../Services/UserService";
import { User } from "../../../../Models/User";
import { useUsersContext } from "../../../../Contexts/UsersContext";
import { useLoading } from "../../../../Hooks/useLoading";

export const useUsers = () => {
  const { items: users, setItems: setUsers } = useUsersContext();
  const { isLoading, setIsLoading } = useLoading(true);

  const [error, setError] = useState<string | null>(null);

  async function getUsers() {
    const result = await UserService.getUsers();
    setIsLoading(false);
    if (result.code) {
      setError("Du har ikke tilgang til å se brukere");
    } else {
      const list: User[] = [];
      result.forEach((u: firebase.firestore.Document) => {
        const user = u.data() as User;
        user.uid = u.id;
        list.push(user);
      });
      setUsers(list);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return { users, error, getUsers, isLoading };
};
