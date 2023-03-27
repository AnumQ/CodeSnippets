import React from "react";
import { Contact } from "../../../Models/Contact";

export const ListView = ({ contacts }: { contacts: Contact[] }) => {
  return (
    <table className="table">
      <thead>
        <TableHeaders />
      </thead>
      <tbody>
        <TableData contacts={contacts} />
      </tbody>
    </table>
  );
};

const TableData = ({ contacts }: { contacts: Contact[] }) => {
  return (
    <>
      {contacts.map((item, index) => {
        return (
          <TableRow key={index + item.contactId} index={index} item={item} />
        );
      })}
    </>
  );
};

const TableHeaders = () => {
  return (
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Id</th>
    </tr>
  );
};

const TableRow = ({ item, index }: { item: Contact; index: number }) => {
  return (
    <tr key={index}>
      <th scope="row">{index + 1}</th>
      <td>{item.name}</td>
      <td>{item.contactId}</td>
    </tr>
  );
};
