import React, { useEffect } from "react";
import { Spinner } from "../../UI/Spinner";
import { useUsers } from "./hooks/useUsers";
import { ListView } from "./UI/ListView";

export const Users = () => {
  const { users, error, getUsers, isLoading } = useUsers();

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <div>
          <ListView
            items={users}
            headers={["Email", "Admin"]}
            refreshUsers={getUsers}
          />
        </div>
      )}
    </div>
  );
};
