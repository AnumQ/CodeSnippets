import React from "react";
import { log } from "../../../../consoleHelper";
import { User } from "../../../../Models/User";
import { UserRepo } from "../../../../Repositories/UserRepo";

export type UserType = User[];
export type ITEM_TYPE = User;

export const ListView = ({
  items,
  headers,
  refreshUsers,
}: {
  items: UserType;
  headers: string[];
  refreshUsers: () => void;
}) => {
  return (
    <table className="table">
      <thead>
        <TableHeaders headers={headers} />
      </thead>
      <tbody>
        <TableData items={items} refreshUsers={refreshUsers} />
      </tbody>
    </table>
  );
};

export const TableData = ({
  items,
  refreshUsers,
}: {
  items: UserType;
  refreshUsers: () => void;
}) => {
  return (
    <>
      {items.map((item, index) => {
        return (
          <TableRow
            key={index + item.uid + item.admin}
            index={index}
            item={item}
            refreshUsers={refreshUsers}
          />
        );
      })}
    </>
  );
};

export const TableHeaders = ({ headers }: { headers: string[] }) => {
  return (
    <tr>
      <th scope="col">#</th>
      {headers.map((item, index) => (
        <th key={item + index} scope="col">
          {item}
        </th>
      ))}
    </tr>
  );
};

const TableRow = ({
  item,
  index,
  refreshUsers,
}: {
  item: ITEM_TYPE;
  index: number;
  refreshUsers: () => void;
}) => {
  return (
    <tr key={index}>
      <th scope="row">{index + 1}</th>
      <td>{item.email}</td>
      <td>
        <input
          className="form-check-input"
          type="checkbox"
          id="flexCheckDefault"
          defaultChecked={item.admin}
          onChange={() => {
            const switched = !item.admin;
            UserRepo.updateUser(item.uid, { admin: switched }, () => {
              refreshUsers();
            });
          }}
        />
      </td>
    </tr>
  );
};
