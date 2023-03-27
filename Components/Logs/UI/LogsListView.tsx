import React from "react";
import { Log } from "../../../Models/Log";
import { Card, CardLeft, CardRight } from "../../UI/Card";
import { LogAuthorView } from "./LogAuthorView";
import { LogBodyView } from "./LogBodyView";
import { LogCreatedView } from "./LogCreatedView";
import { LogTitleView } from "./LogTitleView";

/**
 *
 * @param param logs
 * @returns A view that displays logs
 */
export const LogsListView = ({ logs }: { logs: Log[] }) => {
  const LogView = ({ log, index }: { log: Log; index: number }) => {
    return (
      <Card key={index}>
        <CardLeft>
          <LogTitleView log={log} />
          <LogBodyView log={log} />
        </CardLeft>
        <CardRight>
          <LogAuthorView author={log.author} />
          <LogCreatedView log={log} />
        </CardRight>
      </Card>
    );
  };
  return (
    <>
      {logs.map((log, index) => {
        return <LogView key={index + log.type} log={log} index={index} />;
      })}
    </>
  );
};
