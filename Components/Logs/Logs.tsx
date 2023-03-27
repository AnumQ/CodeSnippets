import React, { useEffect, useState } from "react";
import { log } from "../../consoleHelper";
import { Pagination } from "../Shared/Pagination";
import { Menu, PaginationMenu } from "../UI/shared";
import { Spinner } from "../UI/Spinner";
import { useLogs } from "./hooks/useLogs";
import { LogsListView } from "./UI/LogsListView";

export const Logs = () => {
  const { logsPerPage, isLoading, pages } = useLogs();
  const [currentPage, setCurrentPage] = useState(0);

  const PageMenu = () => {
    return (
      <PaginationMenu>
        <Pagination
          pages={pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </PaginationMenu>
    );
  };

  return !isLoading ? (
    <>
      <PageMenu />
      {logsPerPage.length > 0 ? (
        <LogsListView logs={logsPerPage[currentPage]} />
      ) : null}
    </>
  ) : (
    <Spinner />
  );
};
