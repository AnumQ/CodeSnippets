import React, { useEffect, useState } from "react";
import { useAuthUserContext } from "../../Contexts/AuthUserContext";
import { Client } from "../../Models/Client";
import { User } from "../../Models/User";
import { LoggerRepo } from "../../Repositories/LoggerRepo";
import { UserRepo } from "../../Repositories/UserRepo";
import { Spinner } from "../UI/Spinner";
import { Pagination } from "../Shared/Pagination";
import _ from "lodash";
import { ImportClients } from "./ImportClients";
import { Menu, PaginationMenu } from "../UI/shared";

export const Clients = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [clients, setClients] = useState<Client[][]>([[], []]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasAccess, setHasAccess] = useState(true);
  // TODO: change this with query in firestore instead
  const on_page = 100; // number of clients to display on a page

  const { authUser } = useAuthUserContext();

  useEffect(() => {
    getClientsFromFirebase();
  }, []);

  const updateDataForView = (data: Client[]) => {
    const clients = data;
    setPages(clients.length / on_page + 1);
    const res = _.chunk(clients, on_page);
    setClients(res);
  };

  const getClientsFromFirebase = async () => {
    if (!authUser) {
      LoggerRepo.error(authUserError);
      return;
    }
    const user = (await UserRepo.getUser(authUser.uid)) as User;
    if (!user) return LoggerRepo.error(userError);

    setHasAccess(user.admin);

    if (!user.admin) {
      setIsLoading(false);
      return;
    }

    try {
      const data = await ClientsRepo.getClientsFromFirebase();
      setIsLoading(false);
      updateDataForView(data);
    } catch (error) {
      console.error(clientDataError);
    }
  };

  const renderTableHeaders = () => {
    return (
      <tr>
        <th scope="col">#</th>
        <th scope="col">Id</th>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col">Phone</th>
      </tr>
    );
  };
  const renderClientData = (client: Client, index: number) => {
    return (
      <tr key={client.email}>
        <th scope="row">{currentPage * on_page + (index + 1)}</th>
        <td>{client.id}</td>
        <td>{client.name}</td>
        <td>{client.email}</td>
        <td>{client.phone}</td>
      </tr>
    );
  };

  const PageMenu = () => {
    return (
      <PaginationMenu>
        <Pagination
          pages={pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ImportClients updateData={updateDataForView} />
      </PaginationMenu>
    );
  };

  const ClientTable = () => {
    return (
      <div>
        <PageMenu />
        <table className="table">
          <thead>{renderTableHeaders()}</thead>
          <tbody>{clients[currentPage].map(renderClientData)}</tbody>
        </table>
      </div>
    );
  };

  if (isLoading) {
    return <Spinner />;
  }
  if (!hasAccess) {
    return <div>No access</div>;
  }

  return (
    <>
      <ClientTable />
    </>
  );
};

const authUserError = "authUser is null in getClientsFromFirebase";
const userError = "User is null in getClientsFromFirebase";
const clientDataError = "Error fetching getClientsFromFirebase";
